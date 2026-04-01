import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , AlertModalComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total: number = 0;
  selected: string = '';
    selectedBank: string = '';
selectedTenure: string = '';
selectedBankFee: string = ''; // 🔥 new variable

showAlert: boolean = false;        // alert modal toggle
alertTitle: string = '';           // alert title
alertMessage: string = '';  


  ngOnInit(): void {
    this.total = history.state.total || 0;
  }


banks = [
  { name: 'Askari Bank', fee: 'Higher of 3.75% or Rs. 1,500/- + FED' },
  { name: 'HBL', fee: '3% processing fee + FED' },
  { name: 'UBL', fee: '2.5% processing fee + FED' }
];

tenures = ['3 Months', '6 Months', '12 Months'];

onBankChange(event: any) {
  this.selectedBank = event.target.value;
  this.selectedTenure = '';

  // 🔥 yahan find use karo (TS me allowed hai)
  const bank = this.banks.find(b => b.name === this.selectedBank);
  this.selectedBankFee = bank ? bank.fee : '';
}

onTenureChange(event: any) {
  this.selectedTenure = event.target.value;
}

  // ✅ toggle open/close
  select(method: string) {
    this.selected = this.selected === method ? '' : method;
  }

  confirmOrder() {
  if (!this.selected) {
    this.alertTitle = 'Select Payment';
    this.alertMessage = 'Please select a payment method';
    this.showAlert = true;
    return;
  }

  // Payment selected, show confirmation alert
  this.alertTitle = 'Confirm Order';
  this.alertMessage = `Are you sure you want to place order using ${this.selected}?`;
  this.showAlert = true;
}

placeOrderConfirmed() {
  console.log(`Order placed using ${this.selected}`);
  // yahan tumhara actual order logic
  this.showAlert = false;
}
}