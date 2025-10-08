/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
 constructor(public auth : Auth){}
 logedIn! :boolean
ngOnInit(){
  this.logedIn = this.auth.isAuthenticated();

}
ngOnDestroy(){
  this.logedIn = false;
}

logout() {
    this.auth.logout();
  }
}
