import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cover-banner',
  imports: [CommonModule],
  templateUrl: './cover-banner.component.html',
  styleUrl: './cover-banner.component.css'
})
export class CoverBannerComponent {
  banners=[
    {
      title:'Trendy Fashion for Young Boys',
      subtitle:'Stylish streetwear & modern outfits (18+)',
      image:'https://i.pinimg.com/736x/3e/57/5f/3e575f1ea2559c04d1ac514502c2a4e8.jpg'
    },
    {
      title:'Modern Fashion for Young Girls',
      subtitle:'Trendy looks to match youth style',
      image:'https://i.pinimg.com/1200x/68/60/c4/6860c41a7875a908c44704b3e8e7f770.jpg'
    },
    {
      title:'Kids Fashion (4–12 Years)',
      subtitle:'Cute & stylish outfits for boys & girls',
      image:'https://i.pinimg.com/736x/d8/e1/3c/d8e13c0e8daa95d6025fbe9f4c8207fb.jpg'
    }
  ]

}
