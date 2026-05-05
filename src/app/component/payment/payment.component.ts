import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  // 🔥 payment fields
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
    { name: 'Askari Bank', fee: 'Higher of 3.75% or Rs. 1,500/- + FED' },
    { name: 'HBL', fee: '3% processing fee + FED' },
    { name: 'UBL', fee: '2.5% processing fee + FED' }
  ];

  tenures = ['3 Months', '6 Months', '12 Months'];

  ngOnInit(): void {
    this.total = history.state.total || 0;
  }

  select(method: string) {
    this.selected = this.selected === method ? '' : method;
  }

  onBankChange(event: any) {
    this.selectedBank = event.target.value;
    this.selectedTenure = '';

    const bank = this.banks.find(b => b.name === this.selectedBank);
    this.selectedBankFee = bank ? bank.fee : '';
  }

  onTenureChange(event: any) {
    this.selectedTenure = event.target.value;
  }

  confirmOrder() {
    if (!this.selected) {
      this.alertTitle = 'Select Payment';
      this.alertMessage = 'Please select a payment method';
      this.showAlert = true;
      return;
    }

    this.alertTitle = 'Confirm Order';
    this.alertMessage = `Are you sure you want to place order using ${this.selected}?`;
    this.showAlert = true;
  }

  placeOrderConfirmed() {

    let paymentData: any = {
      method: this.selected,
      total: this.total
    };

    switch (this.selected) {

      case 'easypaisa':
        paymentData.details = {
          accountNumber: this.easypaisaNumber
        };
        break;

      case 'jazzcash':
        paymentData.details = {
          accountNumber: this.jazzcashNumber
        };
        break;

      case 'card':
        paymentData.details = this.cardDetails;
        break;

      case 'hbl':
        paymentData.details = this.hblDetails;
        break;

      case 'cod':
        paymentData.details = {
          type: 'Cash on Delivery'
        };
        break;

      case 'installment':
        paymentData.details = {
          bank: this.selectedBank,
          fee: this.selectedBankFee,
          tenure: this.selectedTenure,
          card: this.installmentCard
        };
        break;
    }

    console.log('🔥 FINAL ORDER DATA:', paymentData);

    this.showAlert = false;
  }
}