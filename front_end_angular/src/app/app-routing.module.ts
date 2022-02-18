import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForwardComponent } from './forward/forward.component';
import { AuthGuard } from './auth.guard';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { LoginIndexComponent } from './login-index/login-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { PublisherComponent } from './publisher/publisher.component';
import { Role } from './model/role_enum';
import { LoginByMoblieComponent } from './login-by-moblie/login-by-moblie.component';


const routes: Routes = [
  {path:"home", component:FrontIndexComponent},
  {path:"login", component:LoginIndexComponent},
  {
    path:"read",
    component:ReaderComponent
  },
  {
    path:"publish",
    component:PublisherComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Publisher] }
  },
  {path:"signUp", component:UserRegisterComponent},
  {path:"login/forgot_password", component:ForgotPasswordComponent},
  {path:"login/login_by_mobile", component:LoginByMoblieComponent},
  {path:"forward", component:ForwardComponent},
  {path:'', redirectTo:"/home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
