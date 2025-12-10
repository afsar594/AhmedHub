import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

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
  constructor(private samina: ApiService,private router:Router) {}
  ngOnInit() {
    this.Bosyproducts = this.samina.products;
    this.girlproduct = this.samina.girlproduct;
    this.kidproducts = this.samina.kidproducts;
  }
  navigateToDetail()
  {
this.router.navigate(['detail-page'])
  }
}
