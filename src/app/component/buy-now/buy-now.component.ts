import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent implements OnInit {
  deliveryForm: FormGroup;
  selectedItems: any;
  checkoutArray: any[] = [];
  areasByProvince: any = {
    Punjab: ['Lahore', 'Faisalabad', 'Multan'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur'],
    KPK: ['Peshawar', 'Mardan', 'Swat'],
    Balochistan: ['Quetta', 'Gwadar', 'Turbat'],
  };
  availableAreas: string[] = [];

  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
  ) {
    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^03[0-9]{9}$')]],
      province: ['', Validators.required],
      area: ['', Validators.required],
      house: ['', Validators.required],
      colony: [''],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const navigation = history.state;
    if (navigation.data != null) {
      if (Array.isArray(navigation.data)) {
        this.selectedItems = navigation.data;
      } else {
        const item = navigation.data;

        const result = {
          id: 0,
          itemId: item.id,
          itemName: item.title,
          price: item.price,
          oldPrice: item.oldPrice,
          discount: item.discount,
          qty: item.qty,
          img: '',

          detail: item.detail,
          color: '',

          classifiedId: item.classifiedId,
          category: item.category,
          brand: item.brand,

          createdDate: new Date().toISOString(),
          CurrentUser: '21',

          image: item.image, // base64 aa raha hai

          subTotal: item.qty * item.price,
          shippingFee: 100,
          tax: 0,
          totalAmount: item.qty * item.price + 100,
        };

        console.log(result);
        this.selectedItems = [result];
      }
    }
    // this.selectedItems = navigation.data || [];
    console.log('Selected Items:', this.selectedItems);

    // Update area options when province changes
    this.deliveryForm.get('province')?.valueChanges.subscribe((province) => {
      this.availableAreas = this.areasByProvince[province] || [];
      this.deliveryForm.get('area')?.setValue('');
    });
  }

  subtotal(): number {
    return this.selectedItems.reduce(
      (sum: number, item: { qty: number; price: number }) =>
        sum + item.qty * item.price,
      0,
    );
  }

placeOrder() {
  this.route.navigate(['/payment']);
}

  save() {
    // 1. Validate form
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    const formValue = this.deliveryForm.value;

    // 2. Prepare user payload
    const userPayload = {
      id: 0,
      name: formValue.fullName,
      provinceId: 1, // fallback to 1 if not selected
      houseNo: formValue.house,
      phone: formValue.phone,
      address: formValue.address,
    };

    // 3. Save user shipping address
    this.api.UserShippingAddress(userPayload).subscribe({
      next: (userRes: any) => {
        if (userRes && userRes.isSuccess) {
          const userId = userRes.data.id;
          console.log('User saved:', userRes);

          if (this.selectedItems && this.selectedItems.length > 0) {
            const payload = this.selectedItems.map((x: any) => {
              const subTotal = x.price * x.qty;
              const shippingFee = 100; // replace with dynamic delivery fee if needed
              const tax = 0;

              return {
                id: x.id || 0,
                itemId: x.itemId,
                itemName: x.itemName ? x.itemName : x.title,
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
                CurrentUser: String(userId),
                image: x.image,
                subTotal: subTotal,
                shippingFee: shippingFee,
                tax: tax,
                totalAmount: subTotal + shippingFee + tax,
              };
            });

            // 4. Save checkout
            this.api.postCheckout(payload).subscribe({
              next: (checkoutRes) => {
                console.log('Checkout successful:', checkoutRes);
                this.route.navigate(['/shop']);
              },
              error: (err) => {
                console.error('Checkout failed:', err);
              },
            });
          } else {
            console.warn('No items selected for checkout.');
          }
        } else {
          console.error('Failed to save user address:', userRes);
        }
      },
      error: (err) => {
        console.error('User shipping API error:', err);
      },
    });
  }
}
