/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// تعريف واجهة User لتحديد شكل بيانات المستخدم
export interface User {
  id: number; // معرف المستخدم
  name: string; // اسم المستخدم
  email: string; // بريد المستخدم الإلكتروني
  role: string; // دور المستخدم (مثل admin أو user)
}

@Injectable({
  providedIn: 'root' // تجعل هذه الخدمة متاحة على مستوى التطبيق بأكمله
})
export class Auth {
  private isLoggedIn = false; // حالة تسجيل الدخول (افتراضيًا false)
  private url = 'https://api.escuelajs.co/api/v1/auth';

  constructor(private http: HttpClient) {}

  // دالة تسجيل الدخول بدون توكن
  // login(email: string, password: string): boolean {
  //   if (email === "admin@gmail.com" && password === "admin") {
  //     this.isLoggedIn = true;
  //     localStorage.setItem("loggedin", "true");
  //     return true;
  //   }
  //   return false;
  // }
 login(email: string, password: string) {
  return this.http.post(`${this.url}/login`, { email, password });
}

 saveToken(response: any) {  
    localStorage.setItem("token", response.access_token);
 }
gretToken() {
  return localStorage.getItem("token");
}
  // دالة تسجيل الخروج
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem("token");
  }

  // دالة للتحقق من تسجيل الدخول
  isAuthenticated(): boolean {
    return localStorage.getItem("token") !== "null";
  }

  // دالة للتحقق إذا كان المستخدم Admin
  isAdmin(): boolean {
    return localStorage.getItem("token") !== null;
  }

  // دالة لجلب بيانات البروفايل (هنا مجرد مثال بدون API)
  getProfile(): User {
    return {
      id: 1,
      name: "Admin User",
      email: "admin@gmail.com",
      role: "admin"
    };
  }
}
