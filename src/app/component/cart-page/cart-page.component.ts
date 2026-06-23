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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertModalComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {

  baseUrl = 'https://localhost:44379/';

  cartItems: any[] = [];
  cartForm!: FormGroup;

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: (() => void) | null = null;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllCartItems();
  }

  initializeForm(): void {
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
getAllCartItems(): void {

  this.api.GetAllItemCard().subscribe({

    next: (r: any) => {

      console.log('Full API Response:', r);

      if (!Array.isArray(r)) {
        console.error('Response is not array');
        return;
      }

      this.cartItems = r.map((x: any) => {

        const img = x?.img || '';

        let imageUrl = 'assets/no-image.png';

        if (img) {
          if (img.startsWith('http')) {
            imageUrl = img;
          } else {
            imageUrl =
              this.baseUrl +
              (img.startsWith('/') ? img.substring(1) : img);
          }
        }

        return {
          id: x.id,
          itemId: x.itemId,
          itemName: x.itemName,
          price: x.price,
          oldPrice: x.oldPrice,
          discount: x.discount,
          qty: x.qty,
          detail: x.detail,
          color: x.color,
          category: x.category,
          brand: x.brand,
          image: imageUrl
        };
      });

      console.log('Cart items loaded:', this.cartItems);

      this.buildFormArray();

      this.api.setCartCount(this.cartItems.length);
    },

    error: (err) => {
      console.error('API Error:', err);
    },

    complete: () => {
      console.log('API call completed');
    }

  });
}
  buildFormArray(): void {

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

  handleConfirm(): void {

    if (this.modalAction) {
      this.modalAction();
    }

    this.showModal = false;
  }

  increaseQty(item: any): void {
    item.qty++;
  }

  decreaseQty(item: any): void {

    if (item.qty > 1) {
      item.qty--;
    }
  }

  removeItem(id: number, itemName?: string): void {

    this.modalTitle = 'Remove Item';
    this.modalMessage = `Are you sure you want to remove "${itemName}" from your cart?`;

    this.modalAction = () => {

      this.api.DeleteCart(id).subscribe({
        next: () => {
          this.getAllCartItems();
        },
        error: (err) => {
          console.error('Delete failed', err);
        },
      });
    };

    this.showModal = true;
  }

  deleteSelected(): void {

    const selectedIds = this.items.controls
      .filter((c) => c.value.selected)
      .map((c) => c.value.id);

    if (selectedIds.length === 0) {

      this.modalTitle = 'No Item Selected';
      this.modalMessage = 'Please select at least one item to delete.';
      this.modalAction = null;
      this.showModal = true;
      return;
    }

    this.modalTitle = 'Delete Selected';
    this.modalMessage =
      'Are you sure you want to delete selected items?';

    this.modalAction = () => {

      const requests = selectedIds.map((id) =>
        this.api.DeleteCart(id)
      );

      forkJoin(requests).subscribe({
        next: () => {
          this.getAllCartItems();
        },
        error: (err) => {
          console.error('Bulk delete failed', err);
        },
      });
    };

    this.showModal = true;
  }

  clearAll(): void {

    this.modalTitle = 'Clear Cart';
    this.modalMessage =
      'Are you sure you want to clear your entire cart?';

    this.modalAction = () => {

      this.api.DeleteAll().subscribe({
        next: () => {

          this.cartItems = [];
          this.buildFormArray();
          this.api.setCartCount(0);
        },
        error: (err) => {
          console.error('Clear cart failed', err);
        },
      });
    };

    this.showModal = true;
  }

  get total(): number {

    if (!this.cartItems?.length) {
      return 0;
    }

    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  totalPriceFix(price: number, qty: number): string {
    return (price * qty).toFixed(2);
  }

  checkout(): void {

    const selectedItems = this.items.controls
      .map((control, index) => ({
        selected: control.value.selected,
        item: this.cartItems[index],
      }))
      .filter((x) => x.selected)
      .map((x) => x.item);

    if (selectedItems.length === 0) {

      this.modalTitle = 'No Item Selected';
      this.modalMessage =
        'Please select at least one item to proceed to checkout.';
      this.modalAction = null;
      this.showModal = true;

      return;
    }

    this.modalTitle = 'Proceed to Checkout';
    this.modalMessage = `Are you sure you want to proceed with ${selectedItems.length} item(s)?`;

    this.modalAction = () => {

      this.router.navigate(['/buy-now'], {
        state: { data: selectedItems },
      });
    };

    this.showModal = true;
  }
}