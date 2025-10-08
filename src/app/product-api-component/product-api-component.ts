/* eslint-disable no-self-assign */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductApi } from '../service/product-api';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
import { Cart } from '../service/cart';

@Component({
  selector: 'app-product-api',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-api-component.html',
  styleUrls: ['./product-api-component.css']
})
export class ProductApiComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  skip = 0;
  limit = 4;
  search = '';
  price_min = 0;
  price_max = 1000;
  lengthOfProducts = 0;
  searchLength = 0;

  currentPage = 1;
  totalPages = 1;

  constructor(
    private productService: ProductApi,
    private router: Router,
    public auth: Auth,
    public cart: Cart
  ) {}

  ngOnInit(): void {
    this.getLength();
    this.loadProducts();
    console.log("Component is initialized");
  }

  loadProducts() {
    this.productService
      .getProducts(this.skip, this.limit, this.search, this.price_min, this.price_max)
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
        this.calculatePagination();
      });
  }

  getLength() {
    this.productService.getFullProducts(this.search).subscribe(data => {
      console.log(data.length);
      this.products = data;
      this.lengthOfProducts = data.length;
      this.calculatePagination();
    });
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.lengthOfProducts / this.limit);
    this.currentPage = Math.floor(this.skip / this.limit) + 1;
  }

  onSearch() {
    this.skip = 0;
    this.loadProducts();
    this.getLength();
  }

  Deleteing(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully');
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 500);
      });
    }
  }

  delete(id: number) {
    this.Deleteing(id);
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  prevPage() {
    if (this.currentPage === 1) return;
    this.skip -= this.limit;
    this.loadProducts();
  }

  nextPage() {
    if (this.currentPage === this.totalPages) return;
    this.skip += this.limit;
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.skip = (page - 1) * this.limit;
    this.loadProducts();
  }

  getDisplayedPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
    alert(`${product.title} is added to cart`);
  }

  ngOnDestroy() {
    console.log("Component is destroyed");
  }
}
