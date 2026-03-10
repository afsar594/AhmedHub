import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent {
  deliveryForm: any;
  selectedItems: any;
  checkoutArray: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      province: ['', Validators.required],
      house: ['', Validators.required],
      area: ['', Validators.required],
      colony: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const navigation = history.state;
    const data = navigation.data;
    this.selectedItems = data;
    console.log('selectedItems', this.selectedItems);
  }
  save() {
    // if (this.deliveryForm.invalid) {
    //   this.deliveryForm.markAllAsTouched();
    //   return;
    // }

    if (this.selectedItems && this.selectedItems.length > 0) {
      console.log('Selected Items for Checkout:', this.selectedItems);
      this.checkoutArray = this.selectedItems;
      const payload = this.checkoutArray.map((x: any) => {
        const subTotal = x.price * x.qty;
        const shippingFee = 0;
        const tax = 0;

        return {
          id: x.id || 0,
          itemId: x.itemId,
          itemName: x.itemName,
          price: x.price,
          oldPrice: x.oldPrice,
          discount: x.discount,
          qty: x.qty,
          img: x.img,
          detail: x.detail,
          color: x.color,
          classifiedId: x.classifiedId,
          category: x.category,
          brand: x.brand,
          createdDate: x.createdDate,
          currentUser: x.currentUser,
          image: x.image,
          subTotal: subTotal,
          shippingFee: shippingFee,
          tax: tax,
          totalAmount: subTotal + shippingFee + tax,
        };
      });
      this.api.postCheckout(payload).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
