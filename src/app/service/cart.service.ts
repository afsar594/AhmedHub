import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  // Cart ko observe karne ke liye
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  // Add product to cart
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    this.cartSubject.next(this.cartItems);
  }

  // Get all cart items
  getCartItems() {
    return this.cartItems;
  }

  // Remove item
  removeFromCart(id: any) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.cartSubject.next(this.cartItems);
  }

  // Clear cart
  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}
