import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-detail-card',
  imports: [CommonModule],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent implements OnInit {
  quantity = 1;
  record: any;

  // 🔹 MAIN IMAGE (backend wali)
  activeImage = '';

  allImages: string[] = []; // backend + dummy images
  hoverImage: string | null = null;

  // 🔹 THUMB CONTROL
  thumbStartIndex = 0;
  thumbLimit = 4;

  // 🔹 DUMMY THUMB IMAGES (neeche cards)
  dummyThumbs: string[] = [
    'https://i.pinimg.com/736x/7d/ef/79/7def796393869162ff105356231c22d9.jpg',
    'https://i.pinimg.com/736x/3b/b0/4b/3bb04b75806c07d3a07266d3aa601881.jpg',
    'https://i.pinimg.com/736x/1a/ff/d9/1affd9c7e9b5f343ac5547c9b976c14e.jpg',
    'https://i.pinimg.com/736x/f4/5f/23/f45f2357f6bc0e1184d2eb3fd518fe55.jpg',
    'https://i.pinimg.com/736x/a0/73/66/a0736626725341b2bf039b51a1b30b66.jpg',
    'https://i.pinimg.com/736x/9b/64/26/9b6426fc6464d23c9bfa39a67dff8a4f.jpg',
    'https://i.pinimg.com/736x/0a/13/69/0a1369c5a5bf51268233fb151edc8e75.jpg',
  ];

  //  selectColor(color:string){
  //   this.selectColor=color;
  //  }

  selectcolor = '';
  selectedsize = '';

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.record = history.state.data;
    console.log('record', this.record);
    this.activeImage = this.record?.images[0];
    // this.activeImage = this.record?.image;
  }

  /* ================= THUMB LOGIC ================= */

  get visibleThumbs() {
    return this.record?.images?.slice(
      this.thumbStartIndex,
      this.thumbStartIndex + this.thumbLimit,
    );
  }

  nextThumb() {
    if (this.thumbStartIndex + this.thumbLimit < this.record.images.length) {
      this.thumbStartIndex++;
    }
  }

  prevThumb() {
    if (this.thumbStartIndex > 0) {
      this.thumbStartIndex--;
    }
  }

  setActiveImage(img: string) {
    this.activeImage = img;
  }

  onThumbHover(img: string) {
    this.hoverImage = img;
  }

  onThumbLeave() {
    this.hoverImage = null;
  }

  get displayedImage(): string {
    return this.hoverImage ? this.hoverImage : this.activeImage;
  }

  /* ================= PRICE ================= */

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

  navigateToForm() {
    this.router.navigate(['form-page']);
  }

  navigateTocart(data: any) {
    // this.router.navigate(['cart-page'], { state: { data: data } });
    // // this.router.navigate(['/login']);
    let payload = {
      id: 0,
      itemId: data.id,
      itemName: data.title,
      price: data.price,
      oldPrice: data.oldPrice,
      discount: data.discount,
      qty: this.quantity,
      img: '',
      image: this.activeImage,
      detail: data.detail,
      color: this.selectcolor,
      classifiedId: data.classifiedId,
      category: data.category,
      brand: data.brand,
      createdDate: '2026-02-01T00:35:26.160Z',
      currentUser: 'string',
    };
    this.api.saveCard(payload).subscribe((res: any) => {
      alert(res.message);
    });
  }
}
