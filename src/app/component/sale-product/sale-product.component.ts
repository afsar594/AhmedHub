import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopSliderComponent } from '../shop-slider/shop-slider.component';

@Component({
  selector: 'app-sale-product',
  standalone: true,
  imports: [CommonModule, ShopSliderComponent],
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.css'],
})
export class SaleProductComponent implements OnInit {

Bosyproducts: any[] = [];
girlproduct: any[] = [];
kidproducts: any[] = [];

  product: any[] = [];
  groupedProducts: any[] = [];
  selectedClassifiedId: number | null = null;
  Id: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.Id = params['id'];
      if (this.Id > 0) {
        this.getAllProductClassifiedId(Number(this.Id));
      } else {
        this.getAllProduct();
      }
    });
  }

  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }

  getAllProduct() {
    this.selectedClassifiedId = null;
    this.api.getItemsAll().subscribe((res: any) => {
      if (res.isSuccess) {
        this.product = res.data;
        this.groupProductsByCategory();
        this.assignCategoryArrays();
      }
    });
  }

assignCategoryArrays() {
  this.Bosyproducts = this.product.filter(p => p.classifiedId === 3);
  this.girlproduct = this.product.filter(p => p.classifiedId === 2);
  this.kidproducts = this.product.filter(p => p.classifiedId === 1);
}

  getAllProductClassifiedId(id: number) {
    this.selectedClassifiedId = id;
    this.api.getItems(id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.product = res.data;
        this.groupProductsByCategory();
      }
    });
  }

  getCaption(classifiedId: number) {
    switch (classifiedId) {
      case 3:
        return {
          title: 'Young Boy’s Collection',
          desc: 'Essential fashion items for 18+ men',
        };
      case 2:
        return {
          title: 'Young Girl’s Collection',
          desc: 'Trendy and stylish items for 18+ women',
        };
      case 1:
        return {
          title: 'Kids Collection (4–12 years old)',
          desc: 'Cool and comfortable clothes for boys & girls',
        };
      default:
        return { title: 'Other Collection', desc: '' };
    }
  }

  groupProductsByCategory() {
    const groups: { [key: number]: any[] } = {};
    this.product.forEach((item) => {
      if (!groups[item.classifiedId]) {
        groups[item.classifiedId] = [];
      }
      groups[item.classifiedId].push(item);
    });

    this.groupedProducts = Object.keys(groups).map((key) => {
      const classifiedId = Number(key);
      return {
        classifiedId,
        caption: this.getCaption(classifiedId),
        products: groups[classifiedId],
      };
    });
  }
}
