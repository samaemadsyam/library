/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { CanActivate,} from '@angular/router';
import { Auth } from '../service/auth';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: Auth) {}


  canActivate(): boolean {
    const role=this.auth.getRole();
   return role==="admin";
  }
}
