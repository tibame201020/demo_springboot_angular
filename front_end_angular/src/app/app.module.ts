import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { LoginIndexComponent } from './login-index/login-index.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReaderComponent } from './reader/reader.component';
import { PublisherComponent } from './publisher/publisher.component';
import { ForwardComponent } from './forward/forward.component';
import { JwtInterceptor } from './inteceptor/jwt.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidUserComponent } from './valid-user/valid-user.component';
import { UnValidUserComponent } from './un-valid-user/un-valid-user.component';
import { LoginByMailComponent } from './login-by-mail/login-by-mail.component';
import { UserResetPwdComponent } from './user-reset-pwd/user-reset-pwd.component';
import { CustomFormControlComponent } from './custom-form-control/custom-form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontIndexComponent,
    LoginIndexComponent,
    UserRegisterComponent,
    ReaderComponent,
    PublisherComponent,
    ForwardComponent,
    ForgotPasswordComponent,
    ValidUserComponent,
    UnValidUserComponent,
    LoginByMailComponent,
    UserResetPwdComponent,
    CustomFormControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
