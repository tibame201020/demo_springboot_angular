import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-by-mail',
  templateUrl: './login-by-mail.component.html',
  styleUrls: ['./login-by-mail.component.css']
})
export class LoginByMailComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  mailCheck:boolean = false;
  private account:string='';
  mail:string = '';
  simpleCode:string = '';

  constructor(private userService:UserService,
              private router: Router,
              private formBuilder:FormBuilder,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isLogIn()) {
      this.router.navigate(['home']);
    }
    this.account = '';
    this.mail = '';
    this.simpleCode = '';
    this.mailCheck = false;
  }

  private createForm():void {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      this.form = this.formBuilder.group({
        mail: ['', [Validators.required, Validators.pattern(emailRegex)]]
      });
  }

  public onSubmit(form : FormGroup):void {
    this.authService.loginByMailCheck(form.value.mail).subscribe(
      res => {
        console.log(res)
        this.mailCheck = res.result;
        if (this.mailCheck) {
          this.account = res.user_info.account;
          this.mail = res.user_info.mail;
          this.simpleCode= '';
        } else {
          this.account = ''
          this.simpleCode= '';
        }
    })

  }

  useSimpleCodeLogin():void{
    alert('click');
  }

  checkSimpleCodeLength():boolean{
    if (this.simpleCode.length == 5) {
      return false;
    } else {
      return true;
    }
  }

  checkSimpleCodeLengthBeingEnter():boolean{
    if (this.simpleCode.length == 5) {
      return false;
    } else {
      return true;
    }
  }

}
