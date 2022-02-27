import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccountValidator } from '../share/validators/user-account-validator';
import { UserService } from '../user.service';
import { CustomInput } from '../model/form/customInput';
import { FormBuilderService } from '../share/form-builder.service';



@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  CustomInput!: CustomInput;
  public userAccountValidator: UserAccountValidator = new UserAccountValidator(this.userService).set('account');
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private fbs: FormBuilderService) { }

  ngOnInit(): void {
    this.createForm();
    this.CustomInput = this.fbs.createInput(this.form).setFieldName('acc').bulid();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
    });
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
