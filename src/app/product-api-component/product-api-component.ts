/* eslint-disable no-self-assign */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// 👆 دي أوامر لتعطيل بعض التحذيرات من ESLint عشان الكود ما يطلعش أخطاء وقت الـ linting
// زي السماح باستخدام any أو متغيرات غير مستخدمة في بعض الأماكن

// ✅ استيراد المكونات والخدمات الضرورية من Angular والمشروع نفسه
import { Component, OnInit, OnDestroy } from '@angular/core'; 
// Component: عشان نقدر نعرف كومبوننت جديد
// OnInit: لتنفيذ كود عند بداية تشغيل الكومبوننت
// OnDestroy: لتنظيف الموارد عند خروجه

import { ProductApi } from '../service/product-api';  
// خدمة مسئولة عن جلب المنتجات (API service)

import { CommonModule } from '@angular/common';  
// عشان نقدر نستخدم الديركتيفات الجاهزة زي *ngFor و *ngIf

import { Router, RouterModule } from '@angular/router';  
// Router: للتنقل بين الصفحات
// RouterModule: عشان نقدر نستخدم <a [routerLink]> في القالب

import { FormsModule } from '@angular/forms';  
// لربط القيم بين المتغيرات والفورم باستخدام [(ngModel)]

import { Auth } from '../service/auth';  
// خدمة تسجيل الدخول (authentication)

import { Cart } from '../service/cart';  
// خدمة السلة (cart management)


// 🎯 تعريف الكومبوننت
@Component({
  selector: 'app-product-api',                 // اسم الكومبوننت داخل HTML
  standalone: true,                            // standalone = مش تابع لموديول
  imports: [CommonModule, RouterModule, FormsModule], // الموديولات المستخدمة داخله
  templateUrl: './product-api-component.html', // مكان ملف الـ HTML
  styleUrls: ['./product-api-component.css']   // مكان ملف الـ CSS
})
export class ProductApiComponent implements OnInit, OnDestroy {

  // 🧩 تعريف المتغيرات

  products: any[] = [];          // كل المنتجات الراجعة من API
  filteredProducts: any[] = [];  // المنتجات بعد تطبيق فلترة أو بحث

  skip = 0;                      // عدد المنتجات اللي هنتخطاها (للباجينيشن)
  limit = 16;                    // عدد المنتجات اللي تظهر في الصفحة الواحدة
  search = '';                   // النص اللي المستخدم بيبحث عنه
  price_min = 0;                 // الحد الأدنى للسعر (للفلترة)
  price_max = 1000;              // الحد الأقصى للسعر
  lengthOfProducts = 0;          // عدد المنتجات الكلي من السيرفر
  searchLength = 0;              // عدد النتائج بعد البحث (مش مستخدم دايمًا)

  currentPage = 1;               // رقم الصفحة الحالية
  totalPages = 1;                // إجمالي عدد الصفحات

  currentProductIndex = 0;       // لتحديد المنتج الحالي في الـ Hero rotation
  currentProduct: any;           // المنتج المعروض حاليًا في الـ Hero
  intervalId: any;               // معرف التايمر المستخدم لتغيير المنتجات تلقائيًا

  // 🧱 الحقن (Dependency Injection)
  constructor(
    private productService: ProductApi, // خدمة الـ API لجلب المنتجات
    private router: Router,             // خدمة الراوتر للتنقل
    public auth: Auth,                  // خدمة الدخول (تستخدم في HTML غالبًا)
    public cart: Cart                   // خدمة السلة
  ) {}

  // 🚀 يتم استدعاؤها أول ما الكومبوننت يشتغل
  ngOnInit(): void {
    this.getLength();     // تحسب العدد الكلي للمنتجات
    this.loadProducts();  // تجيب أول مجموعة منتجات وتعرضها
    console.log("🟢 Component initialized");
  }

  // 📦 تحميل المنتجات من الـ API
  loadProducts() {
    this.productService
      .getProducts(this.skip, this.limit, this.search, this.price_min, this.price_max)
      // استدعاء الدالة اللي تجيب المنتجات بالباراميترات دي
      .subscribe(data => {
        this.products = data;            // نخزن النتايج في products
        this.filteredProducts = data;    // نعمل نسخة تانية منها لو حابين نفلتر
        this.calculatePagination();      // نحسب عدد الصفحات
        this.startProductRotation();     // نبدأ عرض المنتجات المتغيرة في الـ Hero
      });
  }

  // 🔢 حساب العدد الكلي للمنتجات من السيرفر (مش للصفحة الحالية)
  getLength() {
    this.productService.getFullProducts(this.search).subscribe(data => {
      this.lengthOfProducts = data.length; // نحفظ العدد الكلي
      this.calculatePagination();          // نحسب عدد الصفحات بناءً عليه
    });
  }

  // 📄 دالة تحسب إجمالي عدد الصفحات
  calculatePagination() {
    this.totalPages = Math.ceil(this.lengthOfProducts / this.limit);
    // مثلاً لو 100 منتج وlimit=16 → totalPages = 7

    this.currentPage = Math.floor(this.skip / this.limit) + 1;
    // لتحديد الصفحة الحالية بناءً على skip
  }

  // 🔍 البحث — لما المستخدم يكتب في خانة البحث
  onSearch() {
    this.skip = 0;         // نبدأ من أول صفحة دايمًا
    this.loadProducts();   // نعيد تحميل المنتجات بالبحث الجديد
    this.getLength();      // نحدث العدد الكلي بناءً على البحث
  }

  // ❌ حذف منتج معين بالـ ID
  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      // نطلب تأكيد من المستخدم قبل الحذف
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully');
        this.loadProducts(); // نعيد تحميل المنتجات بعد الحذف
        this.getLength();    // نحدث العدد الكلي
      });
    }
  }

  // ⬅️ الذهاب للصفحة السابقة
  prevPage() {
    if (this.currentPage === 1) return; // لو أول صفحة نرجعش
    this.skip -= this.limit;             // نخصم عدد المنتجات في الصفحة
    this.loadProducts();                 // نعيد التحميل
  }

  // ➡️ الذهاب للصفحة التالية
  nextPage() {
    if (this.currentPage === this.totalPages) return; // لو آخر صفحة نتحركش
    this.skip += this.limit;                           // نزود التخطي
    this.loadProducts();                               // نعيد التحميل
  }

  // ⏩ الانتقال مباشرةً لصفحة معينة برقمها
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return; // تحقق من صحة الرقم
    this.currentPage = page;                         // نحفظ الصفحة الحالية
    this.skip = (page - 1) * this.limit;             // نحسب التخطي
    this.loadProducts();                             // نعيد التحميل
  }

  // 📑 إظهار مجموعة محددة من أرقام الصفحات (زي 1 2 3 4 5)
  getDisplayedPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5; // عدد الأزرار اللي نعرضها
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    // نبدأ من صفحة قريبة من الحالية (في النص تقريبًا)

    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages; // نوقف عند آخر صفحة
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i); // نضيف الصفحات في المصفوفة
    }

    return pages; // نرجعها للعرض في HTML
  }

  // 🛒 إضافة منتج للسلة
  addToCart(product: any) {
    this.cart.addToCart(product); // نستدعي خدمة الكارت ونضيف المنتج
    alert(`${product.title} is added to cart`); // رسالة تأكيد
  }

  // 🌀 تشغيل عرض منتج مختلف في الـ Hero كل 10 ثواني
  startProductRotation() {
    if (this.products.length === 0) return; // لو مفيش منتجات نوقف

    this.currentProduct = this.products[this.currentProductIndex];
    // نعرض أول منتج مبدأيًا

    if (this.intervalId) clearInterval(this.intervalId);
    // لو فيه تايمر شغال قبل كده نوقفه عشان ميتكررشي

    this.intervalId = setInterval(() => {
      // كل 10 ثواني نبدل المنتج المعروض
      this.currentProductIndex = (this.currentProductIndex + 1) % this.products.length;
      this.currentProduct = this.products[this.currentProductIndex];
    }, 10000);
  }

  // 🧭 لما المستخدم يضغط على زر "Shop Now"
  scrollToProducts() {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // ننزل تلقائي للجزء بتاع المنتجات بسلاسة
    }
  }

  // 🧹 تنظيف عند تدمير الكومبوننت (مثلاً لو المستخدم غادر الصفحة)
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    // نوقف التايمر عشان ميسببش memory leak
    console.log("🔴 Component destroyed");
  }
}
