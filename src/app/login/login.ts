/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Router } from '@angular/router';

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
    // console.log(this.form.value);
    // console.log(this.form.value.email);
    // console.log(this.form.value.password);
    // const email=this.form.value.email
    // const password=this.form.value.password
    // console.log(`email is ${email} password is ${password}`);
  const {email,password}= this.form.value;
  // if(this.authService.login(email,password)){
    
  //   this.router.navigate(["/ProductApi"])
  // }
  // else{
  //   alert("Email or Password is invalid !!")
  // }
  this.authService.login(email,password).subscribe({
    next:(res)=>{
      this.authService.saveToken(res);
      this.router.navigate(["/ProductApi"])

    },
    error:(error)=>{
      alert("Email or Password is invalid !!")
      console.log(error);
    },

  } )}

}
