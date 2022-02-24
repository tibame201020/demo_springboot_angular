import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserAccountValidator } from '../share/validators/user-account-validator';
import Swal from 'sweetalert2'
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  checkPass:boolean = false;
  mail:string='';
  form: FormGroup = new FormGroup({});

  constructor(private userService:UserService,
              private router: Router,
              private formBuilder:FormBuilder,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isLogIn()) {
      this.router.navigate(['home']);
    }
    this.checkPass = false;
    this.mail = '';
  }

  private createForm():void {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      this.form = this.formBuilder.group({
        account:['', Validators.required],
        mail: ['', [Validators.required, Validators.pattern(emailRegex)]]
      });
  }

  public resend() : void {
    this.onSubmit(this.form);
  }

  public onSubmit(form : FormGroup):void {
    this.userService.checkRestPwdInfo(form.value).subscribe(
      (res => {
        this.checkPass = res.checkResult
        if (res.checkResult) {
          console.log(res)
          this.mail = res.user_info.mail;
        } else {
          form.reset();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'the account or mail is un corrent'
          })
        }
      })
    )
  }


}
