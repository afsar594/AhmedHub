import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopSliderComponent } from '../shop-slider/shop-slider.component';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-sale-product',
  standalone: true,
  imports: [CommonModule, ShopSliderComponent],
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.css'],
})
export class SaleProductComponent implements OnInit {

  // ✅ IMPORTANT: trailing slash
  baseUrl = 'https://localhost:44379/';

  allFilteredProducts: any[] = [];
  noResults: boolean = false;
  Id: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.Id = params['id'];
      if (this.Id > 0) {
        this.getAllProductClassifiedId(Number(this.Id));
      } else {
        this.getItemsAll();
      }
    });

    this.searchService.searchText$.subscribe((query: string) => {
      this.applySearch(query);
    });
  }

  applySearch(query: string) {
    const q = query.toLowerCase();

    this.allFilteredProducts = this.allFilteredProducts.filter(p =>
      p.title.toLowerCase().includes(q)
    );

    this.noResults = this.allFilteredProducts.length === 0;
  }

  getItemsAll() {
    this.api.getItemsAll().subscribe((res: any) => {
      if (res?.isSuccess && Array.isArray(res.data)) {

        this.allFilteredProducts = res.data.map((x: any) => {

          const img = x.itemImages?.[0]?.imgPath;

          return {
            id: x.itemId,
            title: x.itemName,
            price: x.price,
            oldPrice: x.oldPrice,
            discount: x.discount,
            detail: x.detail,
            qty: x.qty,

            // ✅ FINAL IMAGE FIX
            image: img
              ? this.baseUrl + (img.startsWith('/') ? img.substring(1) : img)
              : 'assets/no-image.png'
          };
        });

        console.log('Products:', this.allFilteredProducts);

        this.noResults = this.allFilteredProducts.length === 0;
      }
    });
  }

  getAllProductClassifiedId(id: any) {
    this.api.getItems(id).subscribe((res: any) => {
      if (res?.isSuccess && Array.isArray(res.data)) {

        this.allFilteredProducts = res.data.map((x: any) => {

          const img = x.itemImages?.[0]?.imgPath;

          return {
            id: x.itemId,
            title: x.itemName,
            price: x.price,
            oldPrice: x.oldPrice,
            discount: x.discount,

            image: img
              ? this.baseUrl + (img.startsWith('/') ? img.substring(1) : img)
              : 'assets/no-image.png'
          };
        });

        this.noResults = this.allFilteredProducts.length === 0;
      }
    });
  }

  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }
}