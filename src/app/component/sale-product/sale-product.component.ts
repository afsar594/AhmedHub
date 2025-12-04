import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-sale-product',
  imports: [CommonModule],
  templateUrl: './sale-product.component.html',
  styleUrl: './sale-product.component.css',
})
export class SaleProductComponent implements OnInit {
  Bosyproducts: any;
  girlproduct: any;
  kidproducts: any;
  constructor(private samina: ApiService) {}
  ngOnInit() {
    this.Bosyproducts = this.samina.products;
    this.girlproduct = this.samina.girlproduct;
    this.kidproducts = this.samina.kidproducts;
  }
}
