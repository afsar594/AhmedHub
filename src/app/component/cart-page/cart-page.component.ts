import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  cartForm!: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {}

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
        })
      );
    });
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
    const name = itemName || 'this item';

    if (
      window.confirm(`Are you sure you want to remove "${name}" from your cart?`)
    ) {
      this.api.DeleteCart(id).subscribe(() => {
        this.GetAllItemCard();
      });
    }
  }

  deleteSelected() {
    const selectedIds = this.items.controls
      .filter((control) => control.value.selected)
      .map((control) => control.value.id);

    if (selectedIds.length === 0) {
      alert('Please select at least one item.');
      return;
    }

    if (window.confirm('Are you sure you want to delete selected items?')) {
      selectedIds.forEach((id: number) => {
        this.api.DeleteCart(id).subscribe();
      });

      setTimeout(() => {
        this.GetAllItemCard();
      }, 500);
    }
  }

  clearAll() {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      this.api.DeleteAll().subscribe(() => {
        this.cartItems = [];
        this.buildFormArray();
      });
    }
  }

  get total(): number {
    if (!this.cartItems || this.cartItems.length === 0) return 0;

    return this.cartItems.reduce(
      (acc: number, item: { price: number; qty: number }) =>
        acc + item.price * item.qty,
      0
    );
  }

  totalPriceFix(p: any, q: any) {
    let total = p * q;
    return total.toFixed(2);
  }

 checkout() {

  const selectedItems = this.items.controls
    .map((control, index) => ({
      selected: control.value.selected,
      item: this.cartItems[index]
    }))
    .filter(x => x.selected)
    .map(x => x.item);

  if (selectedItems.length === 0) {
    alert('Please select at least one item to proceed.');
    return;
  }
  const confirmCheckout = window.confirm(
    `Are you sure you want to proceed with ${selectedItems.length} item(s)?`
  );

  if (confirmCheckout) {
    console.log('Selected Items for Checkout:', selectedItems);

    //Yahan aap navigation ya API call kar sakte ho
    // this.router.navigate(['/checkout'], { state: { data: selectedItems } });
  }
}
}