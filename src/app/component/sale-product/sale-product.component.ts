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

    // 🔴 BACKEND CONNECTED (DO NOT DELETE)
    // this.getAllProduct(Number(this.Id));

    // 🟢 DUMMY DATA FOR ALL 3 SECTIONS
    this.loadDummyData();
  }

  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }

  // 🔴 BACKEND FUNCTION (DO NOT DELETE)
  getAllProduct(id: number) {
    this.api.getItems(id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.product = res.data;
      }
    });
  }

  // 🟢 FRONTEND DUMMY DATA
  loadDummyData() {
    this.Bosyproducts = [
      {
        title: 'Men Casual Shirt',
        price: 45,
        oldPrice: 70,
        discount: '30%',
        image: 'https://i.pinimg.com/1200x/4f/66/23/4f6623d0103d52cd9c58a9184c59c0f6.jpg',
      },
      {
    title: 'Boys Casual T-Shirt',
    price: 1200,
    oldPrice: 1500,
    discount: '20%',
    image: 'https://i.pinimg.com/736x/37/71/d7/3771d79710e167a3d15c043abe6e462c.jpg',
  },
  {
    title: 'Boys Denim Jeans',
    price: 1800,
    oldPrice: 2200,
    discount: '18%',
    image: 'https://i.pinimg.com/1200x/12/a6/3a/12a63ac33b6c3dd02d4ac3404c27367d.jpg',
  },
  {
    title: 'Boys Hoodie Sweatshirt',
    price: 2200,
    oldPrice: 2800,
    discount: '21%',
    image: 'https://i.pinimg.com/1200x/bb/fd/76/bbfd763e7ed229acad5d1b3ae58b6139.jpg',
  },
  {
    title: 'Boys Sports Sneakers',
    price: 3500,
    oldPrice: 4000,
    discount: '12%',
    image: 'https://i.pinimg.com/1200x/2f/7c/98/2f7c98a3128e8ae133d9a946165c9911.jpg',
  },
  {
    title: 'Boys Running Shorts',
    price: 900,
    oldPrice: 1200,
    discount: '25%',
    image: 'https://i.pinimg.com/1200x/62/f8/9d/62f89d7bb9abe4001f1970832ec483e6.jpg',
  },
  {
    title: 'Boys Backpack',
    price: 1500,
    oldPrice: 2000,
    discount: '25%',
    image: 'https://i.pinimg.com/1200x/67/8a/c1/678ac13f170822c712e6e8bc3b4d2fbc.jpg',
  },
  {
    title: 'Boys Wrist Watch',
    price: 2500,
    oldPrice: 3000,
    discount: '17%',
    image: 'https://i.pinimg.com/736x/cb/c6/93/cbc69315c06d8992db40a0bb2c597725.jpg',
  },
      {
        title: 'Men Jeans',
        price: 60,
        oldPrice: 90,
        discount: '35%',
        image: 'https://i.pinimg.com/736x/fb/ad/30/fbad30e33401f66a4b0d866ccc33a774.jpg',
      },
    ];

    this.girlproduct = [
      {
        title: 'Girls Summer Dress',
        price: 40,
        oldPrice: 65,
        discount: '38%',
        image: 'https://i.pinimg.com/1200x/71/f8/a1/71f8a18f6263a426c660ae7abea6b25e.jpg',
      },
      {
        title: 'Girls Jacket',
        price: 55,
        oldPrice: 80,
        discount: '31%',
        image: 'https://i.pinimg.com/736x/6e/3b/6c/6e3b6cff7af0c7e6445103d02f2bef5e.jpg',
      },
    ];

    this.kidproducts = [
      {
        title: 'Kids T-Shirt',
        price: 20,
        oldPrice: 30,
        discount: '33%',
        image: 'https://i.pinimg.com/736x/f9/c9/fd/f9c9fda59c9866c5fdd035cf8cfcbe18.jpg',
      },
      {
        title: 'Kids Jeans',
        price: 25,
        oldPrice: 40,
        discount: '37%',
        image: 'https://i.pinimg.com/736x/30/e3/f5/30e3f54b48e7ae6484addfcba763d909.jpg',
      },
    ];
  }
}
