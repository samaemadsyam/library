import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { ProductApiComponent } from './product-api-component/product-api-component';
import { AuthGuard } from './gardss/auth-guard';
import { Register } from './register/register';
import { Profile } from './profile/profile';

export const routes: Routes = [
      { path: 'login', component: Login },
      { path: 'ProductApi', component: ProductApiComponent ,canActivate:[AuthGuard]},
      {path:'',redirectTo:'login',pathMatch:'full'},
      { path: 'register', component: Register },
      {path:'profile',component:Profile},
  



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
