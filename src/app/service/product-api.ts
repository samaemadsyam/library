/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core'; 
// Injectable يجعل الكلاس خدمة يمكن حقنها في أي مكان داخل التطبيق

import { HttpClient, HttpParams } from '@angular/common/http'; 
// HttpClient لإجراء طلبات HTTP
// HttpParams لإضافة باراميترات (parameters) لطلبات GET

import { Observable } from 'rxjs'; 
// Observable للتعامل مع البيانات غير المتزامنة من API

@Injectable({
  providedIn: 'root' 
  // يجعل هذه الخدمة متاحة على مستوى التطبيق بأكمله
})
export class ProductApi {
  private url = 'https://api.escuelajs.co/api/v1/products'; 
  // رابط API الخاص بالمنتجات — هذا مثال، يمكن تغييره حسب API الفعلي

  constructor(private http: HttpClient) {} 
  // حقن HttpClient لاستخدامه في إرسال واستقبال البيانات من API

  // 🟢 دالة لجلب المنتجات مع دعم الفلاتر وPagination
  getProducts(skip: number, limit: number, search: string, price_min: number, price_max: number): Observable<any> {
    let params = new HttpParams() // إنشاء HttpParams لإرسال الباراميترات مع الطلب
      .set('offset', skip) // تحديد عدد العناصر التي يجب تخطيها
      .set('limit', limit) // تحديد عدد المنتجات لكل صفحة
      .set('title', search) // فلترة المنتجات بالبحث عن العنوان
      .set('price_min', price_min) // فلترة حسب الحد الأدنى للسعر
      .set('price_max', price_max); // فلترة حسب الحد الأقصى للسعر

    return this.http.get(this.url, { params }); 
    // إرسال طلب GET للـ API مع الباراميترات
  }

  // 🟢 دالة لجلب كل المنتجات بدون Pagination — مفيدة لمعرفة العدد أو البحث
  getFullProducts(search: string): Observable<any> {
    let params = new HttpParams().set('title', search); 
    // فلترة المنتجات بناءً على نص البحث فقط

    return this.http.get(this.url, { params }); 
    // إرسال طلب GET للـ API مع الباراميترات
  }

  // 🟢 دالة لإضافة منتج جديد
  addProduct(product: any): Observable<any> {
    return this.http.post(this.url, product); 
    // إرسال طلب POST للـ API مع بيانات المنتج
  }

  // 🟢 دالة لجلب منتج معين بواسطة ID
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`); 
    // إرسال طلب GET للـ API مع رقم المنتج
  }

  // 🟢 دالة لحذف منتج بواسطة ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`); 
    // إرسال طلب DELETE للـ API مع رقم المنتج
  }

  // 🟢 دالة لتحديث بيانات منتج معين
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, product); 
    // إرسال طلب PUT للـ API مع رقم المنتج وبيانات التحديث
  }
}
