import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { ShopSliderComponent } from '../shop-slider/shop-slider.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sale-product',
  imports: [CommonModule, ShopSliderComponent],
  templateUrl: './sale-product.component.html',
  styleUrl: './sale-product.component.css',
})
export class SaleProductComponent implements OnInit {
  Bosyproducts: any;
  girlproduct: any;
  kidproducts: any;
  Id: any;
  product: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params['id']);
      this.Id = params['id'];
    });

    // this.Bosyproducts = this.api.products;
    // this.girlproduct = this.api.girlproduct;
    // this.kidproducts = this.api.kidproducts;
    this.getAllProduct(Number(this.Id));
  }
  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }
  getAllProduct(id: number) {
    this.api.getItems(id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.product = res.data;
      }
    });
  }
}
