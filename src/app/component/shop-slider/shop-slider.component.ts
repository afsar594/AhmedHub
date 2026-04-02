import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-slider',
  templateUrl: './shop-slider.component.html',
  styleUrls: ['./shop-slider.component.css']
})
export class ShopSliderComponent implements OnInit {
  currentIndex = 0;

  slides = [
    { image: 'https://www.shutterstock.com/image-vector/black-friday-sale-banner-shopping-260nw-2545954505.jpg', title: 'New Collection', btn: 'Shop Now' },
    { image: 'https://www.shutterstock.com/image-vector/vector-black-friday-poster-banner-260nw-2072125574.jpg', title: 'Big Sale', btn: 'Shop Now' },
    { image: 'https://cdn.vectorstock.com/i/500p/98/69/advertising-banner-design-of-online-grocery-market-vector-55979869.jpg', title: 'Trending Products', btn: 'Shop Now' }
  ];

  ngOnInit() {
    this.autoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  autoSlide() {
    setInterval(() => {
      this.next();
    }, 3000); // har 3 second me slide change
  }
}
