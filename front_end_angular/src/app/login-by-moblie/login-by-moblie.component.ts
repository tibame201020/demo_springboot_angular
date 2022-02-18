import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-by-moblie',
  templateUrl: './login-by-moblie.component.html',
  styleUrls: ['./login-by-moblie.component.css']
})
export class LoginByMoblieComponent implements OnInit {

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
  }

  private createForm():void {
    const phoneRegex = /^09\d{2}-?\d{3}-?\d{3}$/;
      this.form = this.formBuilder.group({
        account:['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(phoneRegex)]]
      });
  }

  public onSubmit(form : FormGroup):void {

  }

}
