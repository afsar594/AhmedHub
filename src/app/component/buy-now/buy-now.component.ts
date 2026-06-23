import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent implements OnInit {

  baseUrl = 'https://localhost:44379';

  deliveryForm: FormGroup;

  selectedItems: any[] = [];

  availableAreas: string[] = [];

  areasByProvince: any = {

    Punjab: [
      'Lahore',
      'Faisalabad',
      'Multan'
    ],

    Sindh: [
      'Karachi',
      'Hyderabad',
      'Sukkur'
    ],

    KPK: [
      'Peshawar',
      'Mardan',
      'Swat'
    ],

    Balochistan: [
      'Quetta',
      'Gwadar',
      'Turbat'
    ],
  };

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {

    // FORM
    this.deliveryForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^03[0-9]{9}$'
          ),
        ],
      ],

      province: [
        '',
        Validators.required
      ],

      area: [
        '',
        Validators.required
      ],

      house: [
        '',
        Validators.required
      ],

      colony: [''],

      address: [
        '',
        Validators.required
      ],
    });
  }

  ngOnInit(): void {

    const navigation = history.state;

    // RECEIVE PREVIOUS PAGE DATA
    if (navigation.data != null) {

      // MULTIPLE ITEMS
      if (
        Array.isArray(
          navigation.data
        )
      ) {

        this.selectedItems =
          navigation.data;

      } else {

        // SINGLE ITEM
        const item =
          navigation.data;

        const result = {

          id: 0,

          itemId: item.id,

          itemName:
            item.title,

          price:
            item.price,

          oldPrice:
            item.oldPrice,

          discount:
            item.discount,

          qty:
            item.qty,

          img: '',

          detail:
            item.detail,

          color: '',

          classifiedId:
            item.classifiedId,

          category:
            item.category,

          brand:
            item.brand,

          createdDate:
            new Date().toISOString(),

          CurrentUser:
            '21',

          image:
            item.image,

          subTotal:
            item.qty *
            item.price,

          shippingFee:
            100,

          tax: 0,

          totalAmount:
            item.qty *
              item.price +
            100,
        };

        this.selectedItems =
          [result];
      }
    }

    console.log(
      'Selected Items:',
      this.selectedItems
    );

    // PROVINCE CHANGE
    this.deliveryForm
      .get('province')
      ?.valueChanges.subscribe(
        (province) => {

          this.availableAreas =
            this
              .areasByProvince[
              province
            ] || [];

          this.deliveryForm
            .get('area')
            ?.setValue('');
        }
      );
  }

  // SUBTOTAL
  subtotal(): number {

    return this.selectedItems.reduce(

      (
        sum: number,
        item: {
          qty: number;
          price: number;
        }
      ) =>

        sum +
        item.qty *
          item.price,

      0
    );
  }

  // PLACE ORDER
  save() {

    // VALIDATION
    if (
      this.deliveryForm.invalid
    ) {

      this.deliveryForm
        .markAllAsTouched();

      return;
    }

    const formValue =
      this.deliveryForm.value;

    // CHECKOUT PAYLOAD
    const checkoutPayload =
      this.selectedItems.map(
        (x: any) => {

          const subTotal =
            x.price * x.qty;

          const shippingFee =
            100;

          const tax = 0;

          return {

            id:
              x.id || 0,

            itemId:
              x.itemId ||
              x.id,

            itemName:
              x.itemName ||
              x.title,

            price:
              x.price,

            oldPrice:
              x.oldPrice,

            discount:
              x.discount,

            qty:
              x.qty,

            img:
              x.img,

            detail:
              x.detail,

            color:
              x.color,

            classifiedId:
              x.classifiedId,

            category:
              x.category,

            brand:
              x.brand,

            createdDate:
              x.createdDate ||
              new Date().toISOString(),

            CurrentUser:
              '21',

            image:
              x.image,

            subTotal:
              subTotal,

            shippingFee:
              shippingFee,

            tax:
              tax,

            totalAmount:
              subTotal +
              shippingFee +
              tax,
          };
        }
      );

    // FINAL DATA
    const finalData = {

      // DELIVERY INFO
      deliveryData: {

        fullName:
          formValue.fullName,

        phone:
          formValue.phone,

        province:
          formValue.province,

        area:
          formValue.area,

        house:
          formValue.house,

        colony:
          formValue.colony,

        address:
          formValue.address,
      },

      // PRODUCTS
      orderItems:
        this.selectedItems,

      // CHECKOUT
      checkoutPayload:
        checkoutPayload,

      // TOTAL
      total:
        this.subtotal() +
        100,
    };

    console.log(
      'FINAL DATA:',
      finalData
    );

    // SEND ALL DATA TO PAYMENT PAGE
    this.route.navigate(
      ['/payment'],
      {
        state: finalData,
      }
    );
  }
}