import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
title =[
  'About Us — Ahmed Hub'
];
intro =[
  `Welcome to Ahmed Hub, your trusted online store for high-quality fashion and lifestyle products. 
  We are committed to bringing our customers the best collection of modern, stylish, and affordable items 
  sourced from reliable suppliers around the world.`
];
mission=[
  `Our mission is simple: To provide premium-quality, stylish, and affordable products with fast delivery 
  and excellent customer support. We aim to make online shopping more reliable and enjoyable for everyone.`
];
offerings=[
  'Stylish and modern fashion products',
    'Trusted quality from verified suppliers',
    'Affordable prices for all customers',
    'Fast order processing',
    'Secure online payments',
    'Friendly customer support',
    'Easy return and exchange options'
];
whyChooseUs=[
  'Quality First: Every product is carefully selected and checked.',
    'Affordable for Everyone: Premium quality without premium prices.',
    'Customer Focused: Your satisfaction is our top priority.',
    'Secure & Safe Shopping: Fully protected checkout system.',
    'Fast Support: We are always ready to help through email or chat.'
];
vision=[
  `We aim to become one of the most trusted online stores by offering products that meet the expectations 
  of modern customers. Our goal is to build long-term relationships through trust, quality, and exceptional service.`

];

  email = 'info@ahmadhub.shop';
  website = 'AhmedHub.shop';
}
