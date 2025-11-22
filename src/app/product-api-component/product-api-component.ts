/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ProductApi } from '../service/product-api';  
import { CommonModule } from '@angular/common';  
import { Router, RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';  
import { Auth } from '../service/auth';  
import { Cart } from '../service/cart';  

@Component({
  selector: 'app-product-api',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-api-component.html',
  styleUrls: ['./product-api-component.css']
})
export class ProductApiComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  skip = 0;
  limit = 8;
  search = '';
  price_min = 0;
  price_max = 1000;
  lengthOfProducts = 0;
  currentPage = 1;
  totalPages = 1;
  currentProductIndex = 0;
  currentProduct: any;
  intervalId: any;

  // ✅ هنا تم تعريف favorites
  favorites = new Set<number>();

  constructor(
    private productService: ProductApi,
    private router: Router,
    public auth: Auth,
    public cart: Cart
  ) {}

  ngOnInit(): void {
    this.getLength();
    this.loadProducts();
    console.log("🟢 Component initialized");
  }

  loadProducts() {
    this.productService
      .getProducts(this.skip, this.limit, this.search, this.price_min, this.price_max)
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
        this.calculatePagination();
        this.startProductRotation();
      });
  }

  getLength() {
    this.productService.getFullProducts(this.search).subscribe(data => {
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

  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully');
        this.loadProducts();
        this.getLength();
      });
    }
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
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
     this.router.navigate(['/cart']);
  }


  // ✅ وظيفة المفضلة
  toggleFav(id: number) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
  }

  startProductRotation() {
    if (this.products.length === 0) return;

    this.currentProduct = this.products[this.currentProductIndex];

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.currentProductIndex = (this.currentProductIndex + 1) % this.products.length;
      this.currentProduct = this.products[this.currentProductIndex];
    }, 10000);
  }

  scrollToProducts() {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    console.log("🔴 Component destroyed");
  }
}
