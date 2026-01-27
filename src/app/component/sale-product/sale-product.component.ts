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
    // 🔹 Backend code commented
    // this.route.queryParams.subscribe((params) => {
    //   this.Id = params['id'];
    //   if (this.Id > 0) {
    //     this.getAllProductClassifiedId(Number(this.Id));
    //   } else {
    //     this.getAllProduct();
    //   }
    // });

    // 🔹 Load dummy data
    this.loadDummyData();
  }

  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }

  loadDummyData() {
    this.product = [
      { classifiedId: 3, title: 'Men T-Shirt', image: 'https://i.pinimg.com/1200x/ea/27/dd/ea27dd9f44ffdeac2985730a9e840a95.jpg', price: 2500, oldPrice: 3200, discount: 20 },
      {
  classifiedId: 3,
  title: 'Men T-Shirt',
  image: 'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
  price: 2500,
  oldPrice: 3200,
  discount: 20,
},
{
  classifiedId: 3,
  title: 'Casual Cotton Shirt',
  image: 'https://i.pinimg.com/736x/b7/bf/8c/b7bf8c19f34698321cc08771df16914d.jpg',
  price: 3800,
  oldPrice: 4500,
  discount: 15,
},
{
  classifiedId: 3,
  title: 'Slim Fit Denim Jeans',
  image: 'https://i.pinimg.com/1200x/cf/d5/90/cfd590f5b4972eeef508b20abc99c9f8.jpg',
  price: 5200,
  oldPrice: 6000,
  discount: 13,
},
{
  classifiedId: 3,
  title: 'Classic Polo Shirt',
  image: 'https://i.pinimg.com/1200x/b8/0c/ad/b80cad1bcce16ff76855f017bd1b5000.jpg',
  price: 3100,
  oldPrice: 3700,
  discount: 16,
},
{
  classifiedId: 3,
  title: 'Summer Casual Shorts',
  image: 'https://i.pinimg.com/1200x/df/e7/7a/dfe77afa4c428ec6b293c328b27e8d4a.jpg',
  price: 2800,
  oldPrice: 3400,
  discount: 18,
},

      { classifiedId: 3, title: 'Casual Shirt', image: 'https://i.pinimg.com/736x/70/be/af/70beaf7973249f8e050c5c08574739f8.jpg', price: 3800, oldPrice: 4500, discount: 15 },
      { classifiedId: 2, title: 'Girls Kurti', image: 'https://i.pinimg.com/736x/96/96/47/969647d2136d4406351461be9f5e5f73.jpg', price: 4200, oldPrice: 5000, discount: 18 },
      { classifiedId: 2, title: 'Stylish Dress', image: 'https://i.pinimg.com/736x/26/03/57/260357f985e11fda9342bbbf8484511e.jpg', price: 5600, oldPrice: 6500, discount: 12 },
      { classifiedId: 1, title: 'Kids Hoodie', image: 'https://i.pinimg.com/1200x/25/2c/87/252c87093da0e69d22aa883b951c6b77.jpg', price: 2800, oldPrice: 3500, discount: 10 },
      { classifiedId: 1, title: 'Kids Shirt', image: 'https://i.pinimg.com/1200x/04/c7/3b/04c73b702cf9720b093fcfd7c260960c.jpg', price: 1900, oldPrice: 2400, discount: 8 },
    ];

    this.assignCategoryArrays();
    this.groupProductsByCategory();
  }

  assignCategoryArrays() {
    this.Bosyproducts = this.product.filter(p => p.classifiedId === 3);
    this.girlproduct = this.product.filter(p => p.classifiedId === 2);
    this.kidproducts = this.product.filter(p => p.classifiedId === 1);
  }

  getCaption(classifiedId: number) {
    switch (classifiedId) {
      case 3: return { title: 'Young Boy’s Collection', desc: 'Essential fashion items for 18+ men' };
      case 2: return { title: 'Young Girl’s Collection', desc: 'Trendy and stylish items for 18+ women' };
      case 1: return { title: 'Kids Collection (4–12 years old)', desc: 'Cool and comfortable clothes' };
      default: return { title: 'Other Collection', desc: '' };
    }
  }

  groupProductsByCategory() {
    const groups: { [key: number]: any[] } = {};
    this.product.forEach(item => {
      if (!groups[item.classifiedId]) { groups[item.classifiedId] = []; }
      groups[item.classifiedId].push(item);
    });
    this.groupedProducts = Object.keys(groups).map(key => ({
      classifiedId: Number(key),
      caption: this.getCaption(Number(key)),
      products: groups[Number(key)],
    }));
  }
}
