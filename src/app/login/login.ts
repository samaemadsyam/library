/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 form!:FormGroup
userRole:string| null =null
  
  constructor(private fb:FormBuilder,private authService:Auth,private router:Router) { }
ngOnInit(){
    this.form=  this.fb.group({
    email :[''],
    password: ['']
  })
}
  onSubmit() {

  const {email,password}= this.form.value;
  this.authService.login(email,password).subscribe({
    next:(res)=>{
      this.authService.saveToken(res);
      console.log(res);
      
      this.authService.getProfile().subscribe(user=>{
        console.log(user);
        this.userRole= user.role;
        localStorage.setItem('role',user.role)
        })

      this.router.navigate(["/ProductApi"])
      

    },
    error:(error)=>{
      alert("Email or Password is invalid !!")
      console.log(error);
    },

  } )}

}
