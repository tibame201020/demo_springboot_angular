import { UserService } from './../user.service';
import { FormBuilderService } from './../util/form/form-builder.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css']
})
export class FrontIndexComponent implements OnInit {
  public user_info = 'default';
  public loginOrNot = 'defaultNot';

  constructor(private authService: AuthService,
    private FormBuilderService:FormBuilderService,
    private UserService:UserService) {
    this.authService.getCurrentUser().subscribe(
      (data: User) => {
        if (data != null) {
          this.user_info = JSON.stringify(data);
        }
      }
    )
  }

  formSetting = {};
  ngOnInit(): void {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      const account = this.FormBuilderService.createInput().setFieldName('account').setRequireErrMsg('the account is required').setPlaceholder('please enter ur account').bulid();
      const mail = this.FormBuilderService.createInput().setFieldName('mail').setRequireErrMsg('the mail is required').setPlaceholder('please enter ur email').setRegex(emailRegex).bulid();
      const inputArray = [account, mail];
      const form = this.FormBuilderService.createForm().setTitle('We Will Help U').setFormBtnValid('Send The ResetPwd to Email').setInputArray(inputArray).bulid();
      this.formSetting = form;
      console.log(this.formSetting)
  }

  public onSubmit(form:any):void {
    console.log(form)
    this.UserService.checkRestPwdInfo(form).subscribe(
      (res => {
        console.log(res)
      })
    )
  }
}
