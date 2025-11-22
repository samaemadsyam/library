import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { ProductApiComponent } from './product-api-component/product-api-component';
import { AuthGuard } from './gardss/auth-guard';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { AddProductComponent } from './add-product.component/add-product.component';
import { AdminGuard } from './gardss/admin-guard';
import { Cart } from './service/cart';
import { CartComponent } from './CartComponent/CartComponent';
// import { Fav } from './fav/fav';

export const routes: Routes = [
      { path: 'login', component: Login },
      { path: 'ProductApi', component: ProductApiComponent ,canActivate:[AuthGuard]},
      {path:'',redirectTo:'login',pathMatch:'full'},
      { path: 'register', component: Register },
      {path:'profile',component:Profile},
      {path:'cart',component: CartComponent},
      {path:'add-product',component: AddProductComponent, canActivate:[AuthGuard , AdminGuard]},

      // {path:'fav',component:Fav},
  



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
