import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart_items';

  // get cart
  getCartItems(): any[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  // save cart
  private saveCart(cart: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  // add to cart
  addToCart(product: any) {
    const cart = this.getCartItems();

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        img: product.img,
        qty: 1,
      });
    }

    this.saveCart(cart);
  }

  // remove single item
  removeItem(id: number) {
    const cart = this.getCartItems().filter(
      (item) => item.id !== id
    );
    this.saveCart(cart);
  }

  // clear all
  clearCart() {
    localStorage.removeItem(this.storageKey);
  }

  // update qty (important)
  updateCart(cart: any[]) {
    this.saveCart(cart);
  }
}
