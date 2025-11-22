/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductApi } from '../service/product-api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
   constructor(private productService : ProductApi, private fb : FormBuilder,private router: Router){}
  form! : FormGroup;

  ngOnInit(){ // ngOninit  // ngOnInt
    this.form = this.fb.group({
      t:['',Validators.required],
      p:[0,Validators.required],
      d:[''],
      image:['image.png'],
      c:['Laptops'],
    })
  }
  addedProduct :any =null;
  onSubmit(){
    if(this.form.valid){
      this.productService.addProduct(this.form.value).subscribe(()=>{
        //alert("Data added ")
        this.addedProduct= this.form.value;
        setTimeout(()=>{
          this.router.navigate(['/product-api'])
        },5000)
      })
    }
  }

}


