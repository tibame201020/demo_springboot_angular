import { map, tap } from 'rxjs';
import { User } from './../model/user';
import { UserService } from './../user.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountValidator } from '../share/validators/user-account-validator';
import { pwdValidator } from '../share/validators/pwd.directive';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({});
  private userAccountValidator:UserAccountValidator = new UserAccountValidator(this.userService).set('account');
  private userMailValidator:UserAccountValidator = new UserAccountValidator(this.userService).set('mail');
  private userPhoneValidator:UserAccountValidator  = new UserAccountValidator(this.userService).set('phone');

  constructor(private userService:UserService,
              private router: Router,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.registerForm)
  }


  private createForm():void {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const phoneRegex = /^09\d{2}-?\d{3}-?\d{3}$/;
    this.registerForm = this.formBuilder.group({
      account: ['', [Validators.required], [this.userAccountValidator.validate.bind(this.userAccountValidator)]],
      pwd: ['', Validators.required],
      pwd2nd: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern(emailRegex)], [this.userMailValidator.validate.bind(this.userMailValidator)]],
      phone: ['', [Validators.required, Validators.pattern(phoneRegex)], [this.userPhoneValidator.validate.bind(this.userPhoneValidator)]],
    }, {validators: pwdValidator });
}

  // sign up submit
  public onRegisterSubmit(registerForm:FormGroup):void {

    if (registerForm.value.pwd != registerForm.value.pwd2nd) {
      alert(`pwd2nd is false`);
      return;
    }

    this.userService.registerUser(registerForm.value).subscribe(
      (res : User) => {
        if (res.message.indexOf("已註冊過") != -1) {

          alert(false);
        } else {
          alert("導入登入頁面");
          this.router.navigate(['login']);
        }

      }
    );
  }
}
