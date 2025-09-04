import {  Injectable } from "@angular/core";
import {  CanActivate, Router } from '@angular/router';
import { Auth } from "../service/auth";

@Injectable({ 
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate  {
  constructor(private auth:Auth , private router:Router){}
  canActivate():boolean {

    if(this.auth.isAuthenticated()) {
      return true;
    }
    else{
          console.log('Redirecting to login');
      this.router.navigate(['/login']);
      return false;

    }
  }

}