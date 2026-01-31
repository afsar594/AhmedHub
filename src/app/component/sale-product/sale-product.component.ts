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
  Bosyproducts: any[] = [];
  girlproduct: any[] = [];
  kidproducts: any[] = [];

  product: any[] = [];
  groupedProducts: any[] = [];
  selectedClassifiedId: number | null = null;
  Id: any;

  filteredBoys: any[] = [];
filteredGirls: any[] = [];
filteredKids: any[] = [];
noResults: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService 
  ) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe((params) => {
//       this.Id = params['id'];
//       if (this.Id > 0) {
//         // this.getAllProductClassifiedId(Number(this.Id));
//       } else {
//         //this.getItemsAll();
//       }
//       this.searchService.searchText$.subscribe((query: string) => {
//     const q = query.toLowerCase();
//     this.filteredBoys = this.Bosyproducts.filter(item => item.title.toLowerCase().includes(q));
//     this.filteredGirls = this.girlproduct.filter(item => item.title.toLowerCase().includes(q));
//     this.filteredKids = this.kidproducts.filter(item => item.title.toLowerCase().includes(q));
// });
//     });
//     this.loadDummyData();
//   }



  ngOnInit() {
    this.loadDummyData();

    // Subscribe to search
    this.searchService.searchText$.subscribe((query: string) => {
      this.applySearch(query);
    });
  }

   applySearch(query: string) {
    const q = query.toLowerCase();
    this.filteredBoys = this.Bosyproducts.filter(p => p.title.toLowerCase().includes(q));
    this.filteredGirls = this.girlproduct.filter(p => p.title.toLowerCase().includes(q));
    this.filteredKids = this.kidproducts.filter(p => p.title.toLowerCase().includes(q));
    // Check if all arrays are empty
  this.noResults =
    this.filteredBoys.length === 0 &&
    this.filteredGirls.length === 0 &&
    this.filteredKids.length === 0;
  }

  loadDummyData() {
    this.product = [
      { classifiedId: 3, title: 'Men T-Shirt', price: 2500, oldPrice: 3200, discount: 20, image: 'https://i.pinimg.com/1200x/ea/27/dd/ea27dd9f44ffdeac2985730a9e840a95.jpg' },
      { classifiedId: 3, title: 'Slim Fit Denim Jeans', price: 5200, oldPrice: 6000, discount: 13, image: 'https://i.pinimg.com/1200x/cf/d5/90/cfd590f5b4972eeef508b20abc99c9f8.jpg' },
      { classifiedId: 2, title: 'Girls Kurti', price: 4200, oldPrice: 5000, discount: 18, image: 'https://i.pinimg.com/736x/96/96/47/969647d2136d4406351461be9f5e5f73.jpg' },
      { classifiedId: 1, title: 'Kids Hoodie', price: 2800, oldPrice: 3500, discount: 10, image: 'https://i.pinimg.com/1200x/25/2c/87/252c87093da0e69d22aa883b951c6b77.jpg' },
       {
        classifiedId: 3,
        title: 'Men T-Shirt',
        image:
          'https://i.pinimg.com/1200x/ea/27/dd/ea27dd9f44ffdeac2985730a9e840a95.jpg',
        price: 2500,
        oldPrice: 3200,
        discount: 20,
        detail: 'abc samina',
      },
      {
        classifiedId: 3,
        title: 'Men T-Shirt',
        image:
          'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
        price: 2500,
        oldPrice: 3200,
        discount: 20,
        detail: 'abc samina',
      },
      {
        classifiedId: 3,
        title: 'Casual Cotton Shirt',
        image:
          'https://i.pinimg.com/736x/b7/bf/8c/b7bf8c19f34698321cc08771df16914d.jpg',
        price: 3800,
        oldPrice: 4500,
        discount: 15,
        detail: 'abc samina',
      },
      {
        classifiedId: 3,
        title: 'Slim Fit Denim Jeans',
        image:
          'https://i.pinimg.com/1200x/cf/d5/90/cfd590f5b4972eeef508b20abc99c9f8.jpg',
        price: 5200,
        oldPrice: 6000,
        discount: 13,
        detail: 'abc samina',
      },
      {
        classifiedId: 3,
        title: 'Classic Polo Shirt',
        image:
          'https://i.pinimg.com/1200x/b8/0c/ad/b80cad1bcce16ff76855f017bd1b5000.jpg',
        price: 3100,
        oldPrice: 3700,
        discount: 16,
        detail: 'abc samina',
      },
      {
        classifiedId: 3,
        title: 'Summer Casual Shorts',
        image:
          'https://i.pinimg.com/1200x/df/e7/7a/dfe77afa4c428ec6b293c328b27e8d4a.jpg',
        price: 2800,
        oldPrice: 3400,
        discount: 18,
        detail: 'abc samina',
      },

      {
        classifiedId: 3,
        title: 'Casual Shirt',
        image:
          'https://i.pinimg.com/736x/70/be/af/70beaf7973249f8e050c5c08574739f8.jpg',
        price: 3800,
        oldPrice: 4500,
        discount: 15,
        detail: 'abc samina',
      },
    ];

    this.assignCategoryArrays();
  }



  getAllProductClassifiedId(id: any) {
    this.api.getItems(id).subscribe((res: any) => {
      if (res.isSuccess) {
        const items = res.data.map((x: any) => ({
          id: x.itemId,
          title: x.itemName,
          price: x.price,
          oldPrice: x.oldPrice,
          discount: x.discount,
          qty: x.qty,

          image: x.itemImages?.length
            ? x.itemImages[0].imgPaths
            : 'assets/no-image.png',

          images: x.itemImages?.map((img: any) => img.imgPaths) || [],

          colors: x.itemColors?.map((c: any) => c.colorCodes) || [],

          sizes: x.itemSizes?.map((s: any) => s.sizeNames) || [],

          classifiedId: x.classifiedId,
          category: x.category,
          brand: x.brand,
          detail: x.detail,
        }));

        this.Bosyproducts = items.filter((x: any) => x.classifiedId === 1);
        this.girlproduct = items.filter((x: any) => x.classifiedId === 2);
        this.kidproducts = items.filter((x: any) => x.classifiedId === 3);
      }
    });
  }
  navigateToDetail(data: any) {
    this.router.navigate(['detail-page'], { state: { data: data } });
  }
  getItemsAll() {
    this.api.getItemsAll().subscribe((res: any) => {
      if (res.isSuccess) {
        const items = res.data.map((x: any) => ({
          id: x.itemId,
          title: x.itemName,
          price: x.price,
          oldPrice: x.oldPrice,
          discount: x.discount,
          qty: x.qty,

          image: x.itemImages?.length
            ? x.itemImages[0].imgPaths
            : 'assets/no-image.png',

          images: x.itemImages?.map((img: any) => img.imgPaths) || [],

          colors: x.itemColors?.map((c: any) => c.colorCodes) || [],

          sizes: x.itemSizes?.map((s: any) => s.sizeNames) || [],

          classifiedId: x.classifiedId,
          category: x.category,
          brand: x.brand,
          detail: x.detail,
        }));

        this.Bosyproducts = items.filter((x: any) => x.classifiedId === 1);
        this.girlproduct = items.filter((x: any) => x.classifiedId === 2);
        this.kidproducts = items.filter((x: any) => x.classifiedId === 3);
        
      }
    });
  }

  // samina here

  // loadDummyData() {
  //   this.product = [
  //     {
  //       classifiedId: 3,
  //       title: 'Men T-Shirt',
  //       image:
  //         'https://i.pinimg.com/1200x/ea/27/dd/ea27dd9f44ffdeac2985730a9e840a95.jpg',
  //       price: 2500,
  //       oldPrice: 3200,
  //       discount: 20,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 3,
  //       title: 'Men T-Shirt',
  //       image:
  //         'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
  //       price: 2500,
  //       oldPrice: 3200,
  //       discount: 20,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 3,
  //       title: 'Casual Cotton Shirt',
  //       image:
  //         'https://i.pinimg.com/736x/b7/bf/8c/b7bf8c19f34698321cc08771df16914d.jpg',
  //       price: 3800,
  //       oldPrice: 4500,
  //       discount: 15,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 3,
  //       title: 'Slim Fit Denim Jeans',
  //       image:
  //         'https://i.pinimg.com/1200x/cf/d5/90/cfd590f5b4972eeef508b20abc99c9f8.jpg',
  //       price: 5200,
  //       oldPrice: 6000,
  //       discount: 13,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 3,
  //       title: 'Classic Polo Shirt',
  //       image:
  //         'https://i.pinimg.com/1200x/b8/0c/ad/b80cad1bcce16ff76855f017bd1b5000.jpg',
  //       price: 3100,
  //       oldPrice: 3700,
  //       discount: 16,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 3,
  //       title: 'Summer Casual Shorts',
  //       image:
  //         'https://i.pinimg.com/1200x/df/e7/7a/dfe77afa4c428ec6b293c328b27e8d4a.jpg',
  //       price: 2800,
  //       oldPrice: 3400,
  //       discount: 18,
  //       detail: 'abc samina',
  //     },

  //     {
  //       classifiedId: 3,
  //       title: 'Casual Shirt',
  //       image:
  //         'https://i.pinimg.com/736x/70/be/af/70beaf7973249f8e050c5c08574739f8.jpg',
  //       price: 3800,
  //       oldPrice: 4500,
  //       discount: 15,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 2,
  //       title: 'Girls Kurti',
  //       image:
  //         'https://i.pinimg.com/736x/96/96/47/969647d2136d4406351461be9f5e5f73.jpg',
  //       price: 4200,
  //       oldPrice: 5000,
  //       discount: 18,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 2,
  //       title: 'Stylish Dress',
  //       image:
  //         'https://i.pinimg.com/736x/26/03/57/260357f985e11fda9342bbbf8484511e.jpg',
  //       price: 5600,
  //       oldPrice: 6500,
  //       discount: 12,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 1,
  //       title: 'Kids Hoodie',
  //       image:
  //         'https://i.pinimg.com/1200x/25/2c/87/252c87093da0e69d22aa883b951c6b77.jpg',
  //       price: 2800,
  //       oldPrice: 3500,
  //       discount: 10,
  //       detail: 'abc samina',
  //     },
  //     {
  //       classifiedId: 1,
  //       title: 'Kids Shirt',
  //       image:
  //         'https://i.pinimg.com/1200x/04/c7/3b/04c73b702cf9720b093fcfd7c260960c.jpg',
  //       price: 1900,
  //       oldPrice: 2400,
  //       discount: 8,
  //       detail: 'abc samina',
  //     },
  //   ];

  //   this.assignCategoryArrays();
  //   this.groupProductsByCategory();
  // }

  assignCategoryArrays() {
    this.Bosyproducts = this.product.filter((p) => p.classifiedId === 3);
    this.girlproduct = this.product.filter((p) => p.classifiedId === 2);
    this.kidproducts = this.product.filter((p) => p.classifiedId === 1);

    this.filteredBoys = [...this.Bosyproducts];
this.filteredGirls = [...this.girlproduct];
this.filteredKids = [...this.kidproducts];
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
          desc: 'Cool and comfortable clothes',
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
    this.groupedProducts = Object.keys(groups).map((key) => ({
      classifiedId: Number(key),
      caption: this.getCaption(Number(key)),
      products: groups[Number(key)],
    }));
  }
}