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
  title!: CustomInput;
  codenm!:CustomInput;
  constructor(private formBuilder: FormBuilder,
    private fbs: FormBuilderService) { }

  ngOnInit(): void {
    this.createForm();
    this.title = this.fbs.createInput(this.form).setFieldName('title').bulid();
    this.codenm = this.fbs.createInput(this.form).setFieldName('code').bulid();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
    });
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
