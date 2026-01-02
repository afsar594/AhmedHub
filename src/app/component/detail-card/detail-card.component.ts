import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-card',
  imports: [CommonModule],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent implements OnInit {
  quantity = 1;

  record: any;
  totalPriceFix(p: any, q: any) {
    let total = p * q;
    return total.toFixed(2);
  }
  increase() {
    this.quantity++;
  }
  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  //  selectColor(color:string){
  //   this.selectColor=color;
  //  }
  colors = [
    '#000000',
    '#ff0000',
    '#0066ff',
    '#ff9900',
    '#7d00ff',
    '#F54927',
    '#F5276C',
    '#F5B027',
    '#CD5C5C',
    '#808080',
    '#008000',
  ];
  selectcolor = '';
  sizes = ['S', 'M', 'L', 'XL'];
  selectedsize = '';

  constructor(private router: Router, public route: ActivatedRoute) {}
  ngOnInit() {
    this.record = history.state.data;
    console.log('Received Data:', this.record);
  }

  navigateToForm() {
    this.router.navigate(['form-page']);
  }
  navigateTocart() {
    this.router.navigate(['cart-page']);
  }
}
