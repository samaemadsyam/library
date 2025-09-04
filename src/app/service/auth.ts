import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private isloggedIn=false;
  constructor() { }
  login(email:string, password:string): boolean {
    if (email==="admin@gmail.com"&& password==="admin") {
        this.isloggedIn =true ;
        localStorage.setItem("logedin", "login");
        return true;
    }
    return false;
  }
  logout(): void {
    this.isloggedIn = false;
    localStorage.removeItem("logedin");
  }
  isAuthenticated(): boolean {
          if(  localStorage.getItem("logedin" )!== null ){
          return true;
          }
          return false;
}
}
