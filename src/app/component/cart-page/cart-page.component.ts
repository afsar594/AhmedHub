import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertModalComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  cartForm!: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.GetAllItemCard();
  }

  initializeForm() {
    this.cartForm = this.fb.group({
      selectAll: [false],
      items: this.fb.array([]),
    });

    this.cartForm.get('selectAll')?.valueChanges.subscribe((value) => {
      this.items.controls.forEach((control) => {
        control.get('selected')?.setValue(value, { emitEvent: false });
      });
    });
  }

  get items(): FormArray {
    return this.cartForm.get('items') as FormArray;
  }

  GetAllItemCard() {
    this.api.GetAllItemCard().subscribe((r: any) => {
      if (r.isSuccess) {
        this.cartItems = r.data || [];
        this.buildFormArray();
        this.api.setCartCount(this.cartItems.length);
      }
    });
  }

  buildFormArray() {
    this.items.clear();

    this.cartItems.forEach((item) => {
      this.items.push(
        this.fb.group({
          id: [item.id],
          selected: [false],
        }),
      );
    });
  }

showModal = false;
modalTitle = '';
modalMessage = '';
modalAction: (() => void) | null = null;

handleConfirm() {
  if (this.modalAction) this.modalAction();
  this.showModal = false;
}


  increaseQty(item: any) {
    item.qty++;
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
    }
  }

removeItem(id: number, itemName?: string) {
  this.modalTitle = 'Remove Item';
  this.modalMessage = `Are you sure you want to remove "${itemName}" from your cart?`;
  this.modalAction = () => {
    this.api.DeleteCart(id).subscribe(() => this.GetAllItemCard());
  };
  this.showModal = true;
}

deleteSelected() {
  const selectedIds = this.items.controls
    .filter(c => c.value.selected)
    .map(c => c.value.id);

  if(selectedIds.length === 0) {
    alert('Please select at least one item.');
    return;
  }

  this.modalTitle = 'Delete Selected';
  this.modalMessage = 'Are you sure you want to delete selected items?';
  this.modalAction = () => {
    selectedIds.forEach(id => this.api.DeleteCart(id).subscribe());
    setTimeout(() => this.GetAllItemCard(), 500);
  };
  this.showModal = true;
}

 clearAll() {
  this.modalTitle = 'Clear Cart';
  this.modalMessage = 'Are you sure you want to clear your entire cart?';
  this.modalAction = () => {
    this.api.DeleteAll().subscribe(() => {
      this.cartItems = [];
      this.buildFormArray();
    });
  };
  this.showModal = true;
}

  get total(): number {
    if (!this.cartItems || this.cartItems.length === 0) return 0;

    return this.cartItems.reduce(
      (acc: number, item: { price: number; qty: number }) =>
        acc + item.price * item.qty,
      0,
    );
  }

  totalPriceFix(p: any, q: any) {
    let total = p * q;
    return total.toFixed(2);
  }

checkout() {
  const selectedItems = this.items.controls
    .map((control, index) => ({ selected: control.value.selected, item: this.cartItems[index] }))
    .filter(x => x.selected)
    .map(x => x.item);

  if(selectedItems.length === 0) {
    alert('Please select at least one item to proceed.');
    return;
  }

  this.modalTitle = 'Proceed to Checkout';
  this.modalMessage = `Are you sure you want to proceed with ${selectedItems.length} item(s)?`;
  this.modalAction = () => {
    this.router.navigate(['/buy-now'], { state: { data: selectedItems } });
  };
  this.showModal = true;
}
}
