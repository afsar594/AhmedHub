import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule   ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
 cartItems: any[] = [];
 cartForm!: FormGroup;

  constructor(private api: ApiService , private fb: FormBuilder) {}
  
  // ngOnInit(): void {
  //   // this.cartItems = history.state.data;
  //   this.GetAllItemCard();
  // }
  // GetAllItemCard() {
  //   this.api.GetAllItemCard().subscribe((r: any) => {
  //     if (r.isSuccess) {
  //       this.cartItems = r.data;
  //       console.log('Received Data:', this.cartItems);
  //     }
  //   });
  // }
ngOnInit(): void {
    this.cartItems = this.dummyCart;
    this.initForm();
  }

  initForm() {
    this.cartForm = this.fb.group({
      selectAll: [false],
      items: this.fb.array(this.cartItems.map(() => this.fb.control(false)))
    });
  }

  get itemsFormArray(): FormArray {
    return this.cartForm.get('items') as FormArray;
  }

  toggleSelectAll() {
    const checked = this.cartForm.get('selectAll')?.value;
    this.itemsFormArray.controls.forEach((ctrl: any) => ctrl.setValue(checked));
  }

  onItemCheckChange() {
    const allChecked = this.itemsFormArray.controls.every((ctrl: any) => ctrl.value === true);
    this.cartForm.get('selectAll')?.setValue(allChecked, { emitEvent: false });
  }

  deleteSelected() {
    const selectedIndexes = this.itemsFormArray.controls
      .map((ctrl: any, i: number) => ctrl.value ? i : -1)
      .filter((i: number) => i !== -1);

    if (selectedIndexes.length === 0) return;

    if (window.confirm(`Delete ${selectedIndexes.length} selected item(s)?`)) {
      this.cartItems = this.cartItems.filter((_, i) => !selectedIndexes.includes(i));
      this.initForm();
    }

    this.cartForm.get('selectAll')?.setValue(false);
  }

// ngOnInit(): void {
//   // temporary (UI testing)
//   this.cartItems = this.dummyCart;

//   // production
//   // this.GetAllItemCard();
// }

  GetAllItemCard() {
  this.api.GetAllItemCard().subscribe({
    next: (r: any) => {
      if (r?.isSuccess && Array.isArray(r.data) && r.data.length > 0) {
        this.cartItems = r.data;
      } else {
        this.cartItems = this.dummyCart;
      }
    },
    error: () => {
      this.cartItems = this.dummyCart;
    },
  });
}


  dummyCart: any[] = [
  {
    id: 1,
    image: 'https://i.pinimg.com/1200x/85/06/26/850626136d53b0ec52bc37e9a35f4c1f.jpg',
    itemName: 'Men’s Classic Warm Hoodie',
    price: 15.99,
    oldPrice: 22.99,
    qty: 1,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/67/25/19/672519b1f90749bf3301c3c0c2023915.jpg',
    itemName: 'Graphic Typography T-Shirt',
    price: 19.5,
    oldPrice: 25,
    qty: 1,
  },
];

  increaseQty(item: any) {
    item.qty++;
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  removeItem(id: number , itemName?: string) {
     const name = itemName || 'this item';
    if (window.confirm(`Are you sure you want to remove "${name}" from your cart?`)) {
    // this.cartItems = this.cartItems.filter((x: { id: number }) => x.id !== id);
    this.api.DeleteCart(id).subscribe((R: any) => {
      this.GetAllItemCard();
    });
  }
}

  clearAll() {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
    this.api.DeleteAll().subscribe((R: any) => {
      this.GetAllItemCard();
    });
    this.cartItems = [];
  }
}

  get total() {
    return this.cartItems.reduce(
      (acc: number, item: { price: number; qty: number }) =>
        acc + item.price * item.qty,
      0,
    );
  }

  //   totalPriceFix(p: any, q: any) {
  //   let total = p * q;
  //   return total.toFixed(2);
  // }
}
