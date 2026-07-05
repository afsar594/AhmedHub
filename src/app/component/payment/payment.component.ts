import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { ApiService } from '../../service/api.service';

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

  paymentErrors: Record<string, string> = {};

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
    private router: Router,
    private api: ApiService,
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

    this.paymentErrors = {};
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

    if (!this.validateSelectedPayment()) {
      this.alertTitle = 'Invalid Payment Details';
      this.alertMessage = 'Please enter payment information in the correct format.';
      this.showAlert = true;
      return;
    }

    this.alertTitle = 'Confirm Order';

    this.alertMessage =
      `Are you sure you want to place order using ${this.selected}?`;

    this.showAlert = true;
  }

  clearError(key: string): void {
    if (this.paymentErrors[key]) {
      this.paymentErrors[key] = '';
    }
  }

  private validateSelectedPayment(): boolean {
    this.paymentErrors = {};

    switch (this.selected) {
      case 'easypaisa':
        if (!this.isPakMobile(this.easypaisaNumber)) {
          this.paymentErrors['easypaisaNumber'] = 'Enter valid Easypaisa number (03XXXXXXXXX).';
        }
        break;

      case 'jazzcash':
        if (!this.isPakMobile(this.jazzcashNumber)) {
          this.paymentErrors['jazzcashNumber'] = 'Enter valid JazzCash number (03XXXXXXXXX).';
        }
        break;

      case 'card':
        this.validateCardFields(
          this.cardDetails.number,
          this.cardDetails.name,
          this.cardDetails.expiry,
          this.cardDetails.cvv,
          'card'
        );
        break;

      case 'hbl':
        if (!/^\d{10,20}$/.test(this.onlyDigits(this.hblDetails.account))) {
          this.paymentErrors['hblAccount'] = 'Account number must be 10 to 20 digits.';
        }

        if (!this.isValidCnic(this.hblDetails.cnic)) {
          this.paymentErrors['hblCnic'] = 'CNIC format must be 12345-1234567-1.';
        }
        break;

      case 'installment':
        if (!this.selectedBank) {
          this.paymentErrors['installmentBank'] = 'Please select bank.';
        }

        if (!this.selectedTenure) {
          this.paymentErrors['installmentTenure'] = 'Please select tenure.';
        }

        this.validateCardFields(
          this.installmentCard.number,
          this.installmentCard.name,
          this.installmentCard.expiry,
          this.installmentCard.cvv,
          'installment'
        );
        break;
    }

    return Object.values(this.paymentErrors).every((v) => !v);
  }

  private validateCardFields(
    number: string,
    name: string,
    expiry: string,
    cvv: string,
    prefix: 'card' | 'installment'
  ): void {
    if (!/^\d{16}$/.test(this.onlyDigits(number))) {
      this.paymentErrors[`${prefix}Number`] = 'Card number must be 16 digits.';
    }

    if (!/^[A-Za-z ]{3,}$/.test((name || '').trim())) {
      this.paymentErrors[`${prefix}Name`] = 'Name on card must be at least 3 letters.';
    }

    if (!this.isValidExpiry(expiry)) {
      this.paymentErrors[`${prefix}Expiry`] = 'Expiry must be valid MM/YY and not expired.';
    }

    if (!/^\d{3,4}$/.test(this.onlyDigits(cvv))) {
      this.paymentErrors[`${prefix}Cvv`] = 'CVV must be 3 or 4 digits.';
    }
  }

  private onlyDigits(value: string): string {
    return String(value || '').replace(/\D/g, '');
  }

  private isPakMobile(value: string): boolean {
    return /^03\d{9}$/.test(this.onlyDigits(value));
  }

  private isValidCnic(value: string): boolean {
    return /^\d{5}-\d{7}-\d$/.test(String(value || '').trim());
  }

  private isValidExpiry(value: string): boolean {
    const match = String(value || '').trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) {
      return false;
    }

    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
  }

  // FINAL ORDER
  placeOrderConfirmed() {

    const amount =
      this.checkoutPayload?.[0]?.totalAmount ??
      this.total;

    let paymentDetails: any = {};

    switch (this.selected) {

      // EASYPAISA
      case 'easypaisa':

        paymentDetails = {
          method: 'Easypaisa',
          amount,
          accountNumber:
            this.easypaisaNumber
        };

        break;

      // JAZZCASH
      case 'jazzcash':

        paymentDetails = {
          method: 'JazzCash',
          amount,
          accountNumber:
            this.jazzcashNumber
        };

        break;

      // CARD
      case 'card':

        paymentDetails = {
          method: 'Credit/Debit Card',
          amount,
          card: this.cardDetails
        };

        break;

      // HBL
      case 'hbl':

        paymentDetails = {
          method: 'HBL',
          amount,
          account: this.hblDetails.account,
          cnic: this.hblDetails.cnic
        };

        break;

      // COD
      case 'cod':

        paymentDetails = {
          method: 'Cash On Delivery',
          amount
        };

        break;

      // INSTALLMENT
      case 'installment':

        paymentDetails = {
          method: 'Installment',
          amount,
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
    id:0,

    userId:
      this.userData?.id || 0,

    name:
      this.deliveryData?.fullName??0,

    phone:
      this.deliveryData?.phone??0,

    provinceId:0,
      //this.deliveryData?.province??0,

    area:
      this.deliveryData?.area??'',

    houseNo:
      this.deliveryData?.house??'',

    colony:
      this.deliveryData?.colony??'',

    address:
      this.deliveryData?.address??'',
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
debugger
console.log(
  '🔥 FINAL COMPLETE PAYLOAD:',
  this.finalPayload
);
    // CLOSE ALERT
    this.showAlert = false;

    // SUCCESS PAGE
    // this.router.navigate(['/success']);
    this.savecustomer(this.finalPayload.customer);
    this.savePayment(this.finalPayload.payment);
    this.saveCheckout(this.finalPayload.checkout);  
  }

savecustomer(data: any): void {

  this.api.UserShippingAddress(data).subscribe({

    next: (res: any) => {

      console.log('Customer response:', res);

      if (!res || !res.isSuccess) {
        console.error('Customer creation failed:', res);
        return;
      }

      if (!res.data || !res.data.id) {
        console.error('Customer ID missing in response:', res);
        return;
      }

      if (!this.finalPayload?.payment) {
        console.error('Payment object is missing');
        return;
      }

      this.finalPayload.payment.userId = res.data.id;

      this.savePayment(this.finalPayload.payment);
    },

    error: (err) => {
      console.error('Error creating customer:', err);
    }

  });
}
savePayment(value: any) {

  const payload = {
    id: 0,
    orderId: 0,
    method: value.method || '',
    accountNumber: value.accountNumber || '',
    cnic: value.cnic || '',
    paymentStatus: value.paymentStatus || '',
    userId: value.userId,
    createdDate: new Date().toISOString(),
    amount: value.amount || 0
  };

  console.log('Saving payment with data:', payload);

  return this.api.CreatePayment(payload).subscribe({
    next: (res) => {
      console.log('Payment created:', res);
    },
    error: (err) => {
      console.error('Error creating payment:', err);
    }
  });
}

saveCheckout(data: any) {
  this.api.postCheckout(data).subscribe({
    next: (res:any) => {
      console.log('Checkout successful:', res);
      if(res.isSuccess) {
        alert('Order placed successfully!');
        this.router.navigate(['/shop']);}
    },
    error: (err) => {
      console.error('Error during checkout:', err);
    }
  }); 
}
}