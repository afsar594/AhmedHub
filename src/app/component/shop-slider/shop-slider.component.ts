import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-slider',
  templateUrl: './shop-slider.component.html',
  styleUrls: ['./shop-slider.component.css']
})
export class ShopSliderComponent implements OnInit {
  currentIndex = 0;

  slides = [
    { image: 'https://i.pinimg.com/736x/4b/95/2c/4b952cea13038cf60446d7a55ca1cddc.jpg', title: 'New Collection', btn: 'Shop Now' },
    { image: 'https://i.pinimg.com/736x/b1/6c/10/b16c10c379919a5ab0421ebd3d4ba0ed.jpg', title: 'Big Sale', btn: 'Shop Now' },
    { image: 'https://i.pinimg.com/736x/de/61/5e/de615e8da87828121a92e12453c03e98.jpg', title: 'Trending Products', btn: 'Shop Now' }
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
