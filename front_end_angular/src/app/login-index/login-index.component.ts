import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {

  constructor(private userService:UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public onLoginSubmit(loginForm : NgForm) {
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
    loginForm.reset();
  }
}
