/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cart: any[] = [];

  constructor() {
    const cartInLocalStorage = localStorage.getItem('cart');
    if (cartInLocalStorage) {
      this.cart = JSON.parse(cartInLocalStorage);
    }
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
