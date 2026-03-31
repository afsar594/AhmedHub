import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total: number = 0;
  selected: string = '';

  ngOnInit(): void {
    this.total = history.state.total || 0;
  }

  // payment select karne ke liye
  select(method: string) {
    this.selected = method;
  }

  // confirm order
  confirmOrder() {
    if (!this.selected) {
      alert('Please select a payment method');
      return;
    }

    // yahan tum API call ya order place logic laga sakti ho
    alert(`Order placed successfully using ${this.selected}`);

    // optional: redirect karna ho
    // this.router.navigate(['/success']);
  }


  

}