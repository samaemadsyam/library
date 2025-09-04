import { Component, OnInit } from '@angular/core';
import { ProductApi } from '../service/product-api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-api-component',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-api-component.html',
  styleUrl: './product-api-component.css'
})
export class ProductApiComponent implements OnInit {
products: any[] = [];
constructor(private productService: ProductApi) {}
  ngOnInit(): void {
      this.productService.getProducts().subscribe(data=>{
      console.log(data);
      this.products=data;
    })
  }
}
