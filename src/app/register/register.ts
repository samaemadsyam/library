import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ إضافة الاستيراد

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  password = '';
  repeatPassword = '';
  email = '';
  name = '';

  submitted = false;

  constructor(private router: Router) {} // ✅ حقن الـ Router

  submitForm() {
    this.submitted = true;
    console.log('submit', {
      name: this.name,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    });

    // بعد التسجيل يروح على صفحة المنتجات
    setTimeout(() => {
      this.router.navigate(['/ProductApi']); // ✅ توجيه للمنتجات
    }, 1000);
  }
}
