/* eslint-disable @angular-eslint/prefer-inject */
import {  Injectable } from "@angular/core";
import {  CanActivate, Router } from '@angular/router';
import { Auth } from "../service/auth";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true; // المستخدم مسجل الدخول، يسمح له بالدخول
    } else {
      console.log('Redirecting to login'); // طباعة رسالة في الكونسول
      this.router.navigate(['/login']);   // إعادة التوجيه لصفحة تسجيل الدخول
      return false; // منع الوصول للصفحة المطلوبة
    }
  }
}
