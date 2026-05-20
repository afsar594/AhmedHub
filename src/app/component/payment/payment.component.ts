import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertModalComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total: number = 0;

  selected: string = '';

  // PREVIOUS PAGE DATA
  deliveryData: any;
  orderItems: any[] = [];
  checkoutPayload: any[] = [];
  userData: any;
  checkoutResponse: any;

  // FINAL PAYLOAD
  finalPayload: any;

  // PAYMENT FIELDS
  easypaisaNumber: string = '';
  jazzcashNumber: string = '';

  cardDetails = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  hblDetails = {
    account: '',
    cnic: ''
  };

  installmentCard = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  selectedBank: string = '';
  selectedTenure: string = '';
  selectedBankFee: string = '';

  showAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';

  banks = [
    {
      name: 'Askari Bank',
      fee: 'Higher of 3.75% or Rs. 1,500/- + FED'
    },
    {
      name: 'HBL',
      fee: '3% processing fee + FED'
    },
    {
      name: 'UBL',
      fee: '2.5% processing fee + FED'
    }
  ];

  tenures = [
    '3 Months',
    '6 Months',
    '12 Months'
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const nav = history.state;

    console.log('RECEIVED DATA:', nav);

    // RECEIVE ALL PREVIOUS DATA
    this.deliveryData = nav.deliveryData;

    this.orderItems = nav.orderItems || [];

    this.checkoutPayload =
      nav.checkoutPayload || [];

    this.userData = nav.userData;

    this.checkoutResponse =
      nav.checkoutResponse;

    this.total = nav.total || 0;
  }

  // SELECT PAYMENT METHOD
  select(method: string) {

    this.selected =
      this.selected === method
        ? ''
        : method;
  }

  // BANK CHANGE
  onBankChange(event: any) {

    this.selectedBank =
      event.target.value;

    this.selectedTenure = '';

    const bank = this.banks.find(
      b => b.name === this.selectedBank
    );

    this.selectedBankFee =
      bank ? bank.fee : '';
  }

  // TENURE CHANGE
  onTenureChange(event: any) {

    this.selectedTenure =
      event.target.value;
  }

  // CONFIRM ORDER
  confirmOrder() {

    if (!this.selected) {

      this.alertTitle =
        'Select Payment Method';

      this.alertMessage =
        'Please select payment method';

      this.showAlert = true;

      return;
    }

    this.alertTitle = 'Confirm Order';

    this.alertMessage =
      `Are you sure you want to place order using ${this.selected}?`;

    this.showAlert = true;
  }

  // FINAL ORDER
  placeOrderConfirmed() {

    let paymentDetails: any = {};

    switch (this.selected) {

      // EASYPAISA
      case 'easypaisa':

        paymentDetails = {
          method: 'Easypaisa',
          accountNumber:
            this.easypaisaNumber
        };

        break;

      // JAZZCASH
      case 'jazzcash':

        paymentDetails = {
          method: 'JazzCash',
          accountNumber:
            this.jazzcashNumber
        };

        break;

      // CARD
      case 'card':

        paymentDetails = {
          method: 'Credit/Debit Card',
          card: this.cardDetails
        };

        break;

      // HBL
      case 'hbl':

        paymentDetails = {
          method: 'HBL',
          account: this.hblDetails.account,
          cnic: this.hblDetails.cnic
        };

        break;

      // COD
      case 'cod':

        paymentDetails = {
          method: 'Cash On Delivery'
        };

        break;

      // INSTALLMENT
      case 'installment':

        paymentDetails = {
          method: 'Installment',
          bank: this.selectedBank,
          tenure: this.selectedTenure,
          processingFee:
            this.selectedBankFee,
          card: this.installmentCard
        };

        break;
    }

    // FINAL COMPLETE PAYLOAD
  this.finalPayload = {

  // CUSTOMER
  customer: {

    userId:
      this.userData?.id || 0,

    fullName:
      this.deliveryData?.fullName,

    phone:
      this.deliveryData?.phone,

    province:
      this.deliveryData?.province,

    area:
      this.deliveryData?.area,

    house:
      this.deliveryData?.house,

    colony:
      this.deliveryData?.colony,

    address:
      this.deliveryData?.address,
  },

  // PRODUCTS
  items: [
    ...this.orderItems,

    // SUMMARY OBJECT
    {
      summary: {
        subtotal: this.total - 100,
        shippingFee: 100,
        totalAmount: this.total
      }
    }
  ],

  // CHECKOUT
  checkout: this.checkoutPayload,

  // PAYMENT
  payment: paymentDetails,

  // ORDER DATE
  createdDate:
    new Date().toISOString()
};

console.log(
  '🔥 FINAL COMPLETE PAYLOAD:',
  this.finalPayload
);
    // CLOSE ALERT
    this.showAlert = false;

    // SUCCESS PAGE
    // this.router.navigate(['/success']);
  }
}