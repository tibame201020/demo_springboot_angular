import { User } from './../model/user';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private userService:UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // sign up submit
  public onRegisterSubmit(registerForm:NgForm):void {

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
