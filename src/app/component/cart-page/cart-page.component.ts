import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: any;
  constructor() {}
  ngOnInit(): void {
    this.cartItems = history.state.data;
    console.log('Received Data:', this.cartItems);
  }

  // cartItems:any[] = [
  //   {
  //     img:
  //       'https://i.pinimg.com/1200x/85/06/26/850626136d53b0ec52bc37e9a35f4c1f.jpg',
  //     title: 'Men’s Classic Warm Hoodie',
  //     price: 15.99,
  //     oldPrice: 22.99,
  //     discount: '-30%',
  //     qty:1,
  //     id:1,
  //   },
  //   {
  //     img:
  //       'https://i.pinimg.com/736x/67/25/19/672519b1f90749bf3301c3c0c2023915.jpg',
  //     title: 'Graphic Typography T-shirt',
  //     price: 19.5,
  //     oldPrice: 25.0,
  //     discount: '-22%',
  //     qty:1,
  //     id:2,
  //   }
  // ];

  increaseQty(item: any) {
    item.qty++;
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter((x: { id: number }) => x.id !== id);
  }

  clearAll() {
    this.cartItems = [];
  }

  get total() {
    return this.cartItems.reduce(
      (acc: number, item: { price: number; qty: number }) =>
        acc + item.price * item.qty,
      0,
    );
  }

  //   totalPriceFix(p: any, q: any) {
  //   let total = p * q;
  //   return total.toFixed(2);
  // }
}
