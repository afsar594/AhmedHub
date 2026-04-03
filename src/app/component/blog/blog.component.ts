import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  featuredPost = {
    title: 'How to Start Online Store in Pakistan (2026)',
    description: 'Learn step-by-step how to launch your own online store and start earning from home.',
    image: 'assets/blog/featured.jpg'
  };

  categories = [
    'Shopping',
    'Online Earning',
    'Marketing',
    'Design'
  ];

  posts = [
    {
      title: 'Top 10 Trending Products in Pakistan',
      category: 'Shopping',
      date: '2 Apr 2026',
      image: 'https://i.pinimg.com/736x/22/8d/86/228d86f03ae89f378a5e4f947fcd8c83.jpg'
    },
    {
      title: 'How to Earn Money Online Without Investment',
      category: 'Online Earning',
      date: '1 Apr 2026',
      image: 'https://i.pinimg.com/736x/f7/b2/06/f7b206c7323ba5104f1abf360fc6b249.jpg'
    },
    {
      title: 'Facebook Ads Guide for Beginners',
      category: 'Marketing',
      date: '30 Mar 2026',
      image: 'https://i.pinimg.com/736x/9c/c2/c1/9cc2c12a021c93e196425ff08d3be0de.jpg'
    },
    {
      title: 'Logo Design Tips for Beginners',
      category: 'Design',
      date: '28 Mar 2026',
      image: 'https://i.pinimg.com/736x/d5/bd/46/d5bd46643dddcd42efcf74b6558df3f5.jpg'
    }
  ];

}