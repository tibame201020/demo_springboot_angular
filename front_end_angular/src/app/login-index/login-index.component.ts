import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private userService:UserService,
              private router: Router,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm():void {
      this.loginForm = this.formBuilder.group({
        account:['', Validators.required],
        pwd:['', Validators.required]
      });
  }

  public onLoginSubmit(loginForm : FormGroup):void {
    this.userService.validUser(loginForm.value).subscribe(
      (res:Boolean) => {
        if (res) {
          // 驗證成功
          alert(res);
          this.router.navigate(['home']);
        } else {
          // 驗證fail
          alert (res + "登入失敗");
        }
      }
    )
  }
}
