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
import { LoginByMoblieComponent } from './login-by-moblie/login-by-moblie.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontIndexComponent,
    LoginIndexComponent,
    UserRegisterComponent,
    ReaderComponent,
    PublisherComponent,
    ForwardComponent,
    LoginByMoblieComponent,
    ForgotPasswordComponent
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
