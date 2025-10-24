/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav implements OnInit, OnDestroy {
  logedIn!: boolean;

  constructor(public auth: Auth, private router: Router) {}

  ngOnInit() {
    this.logedIn = this.auth.isAuthenticated();
  }

  ngOnDestroy() {
    this.logedIn = false;
  }

  logout() {
    this.auth.logout(); // ❌ مسح الجلسة
    this.router.navigate(['/login']); // ✅ إعادة التوجيه لصفحة تسجيل الدخول
  }
}
