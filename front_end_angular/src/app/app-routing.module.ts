import { UserRegisterComponent } from './user-register/user-register.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { LoginIndexComponent } from './login-index/login-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"home", component:FrontIndexComponent},
  {path:"login", component:LoginIndexComponent},
  {path:"signUp", component:UserRegisterComponent},
  {path:'', redirectTo:"/home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
