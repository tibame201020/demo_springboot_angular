import { CustomFormService } from './../custom-form.service';
import { CustomInput } from './../model/customInput';
import { CustomInputService } from './../custom-input.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  type:string ='text';
  placeHolder:string = 'test placeHolder';
  name:string='test name';
  value:string='test value';
  @Input() customInput?:CustomInput;
  @Input() text?:string;


  public customInputService: CustomInputService = new CustomInputService();

  constructor(private customFormService:CustomFormService) { }

  ngOnInit(): void {
    this.customInputService.fieldname = this.name;
    this.customInputService = new CustomInputService().set(this.customInput);
  }

  checkRequired():boolean {
    return this.customInputService.checkRequired(this.value);
  }

  checkPattern():boolean {
    return this.customInputService.checkPattern(this.value);
  }

  checkCustom():boolean {
    return this.customInputService.checkCustom(this.value);
  }


}
