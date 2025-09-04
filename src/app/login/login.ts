import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
form!:FormGroup;
  constructor(private fb:FormBuilder,private authService:Auth,private router:Router) { }
ngOnInit(){
    this.form=  this.fb.group({
    email :[''],
    password: ['']
  })
}
  onSubmit() {
  const {email,password}= this.form.value;
  if(this.authService.login(email,password)){
    this.router.navigate(["/ProductApi"])
  }
  else{
    alert("Email or Password is invalid !!")
  }
  } 
}
