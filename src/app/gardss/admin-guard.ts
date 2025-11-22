import { Injectable } from '@angular/core';
import { CanActivate,} from '@angular/router';
import { Auth } from '../service/auth';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private auth: Auth) {}


  canActivate(): boolean {
    const role=this.auth.getRole();
   return role==="admin";
  }
}
