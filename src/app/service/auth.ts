/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  getRole(): string {
    return localStorage.getItem('role') || '';
  }


  private url = 'https://api.escuelajs.co/api/v1/auth';

  constructor(private http: HttpClient) {}

  // تسجيل الدخول من API
  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password });
  }
  getProfile() {
    return this.http.get(`${this.url}/profile`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') }`,
      },
    }
    );
  }
  // حفظ التوكن في LocalStorage
  saveToken(response: any) {
    localStorage.setItem("token", response.access_token);
   }

  // جلب التوكن
  getToken() {
    return localStorage.getItem("token");
  }

  // تسجيل الخروج
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

  }

  // التحقق من حالة تسجيل الدخول
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token; // ترجع true لو فيه توكن
  }

  // مثال لبيانات المستخدم (تجريبية)
  // getProfile(): User {
  //   return {
  //     id: 1,
  //     name: "Admin User",
  //     email: "admin@gmail.com",
  //     role: "admin"
  //   };
  // }
}
