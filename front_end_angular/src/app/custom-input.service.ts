import { CustomFormService } from './custom-form.service';
import { CustomInput } from './model/customInput';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomInputService {
  required:boolean = false;
  pattern:boolean = false;
  regex:any = '';
  custom:boolean = false;
  custoumRule?:any;

  fieldname:string='';

  requiredMsg:string = '';
  patternMsg:string = '';
  customMsg:string = '';

  constructor() {
  }

  set (customInput:CustomInput | undefined): CustomInputService {
    this.fieldname = customInput? customInput.fieldName : '';
    this.required = customInput? customInput.required : false;
    this.pattern = customInput? customInput.pattern : false;
    this.regex = customInput? customInput.regex : '';
    this.custom = customInput? customInput.custom : false;
    this.custoumRule = customInput? customInput.custoumRule : '';
    this.requiredMsg = 'the ' + this.fieldname + ' is requried';
    this.patternMsg = 'the ' + this.fieldname + ' is un-correct';
    this.customMsg = 'the ' + this.fieldname + ' is un-valid';
    this.requiredMsg = customInput? customInput.requiredMsg? customInput.requiredMsg:this.requiredMsg : this.requiredMsg;
    this.patternMsg = customInput? customInput.patternMsg? customInput.patternMsg:this.patternMsg : this.patternMsg;
    this.customMsg = customInput? customInput.customMsg? customInput.customMsg:this.customMsg : this.customMsg;
    return this;
  }

  checkRequired(value:string):boolean {
    if (!this.checkPattern(value) && !this.checkCustom(value)) {
    if (!this.required) {
      return false;
    }
    if (value.length == 0) {
      return true;
    } else {
      return false;
    }
    } else {
      return false;
    }
  }

  checkPattern(value:string):boolean {
    if (!this.pattern || value.length == 0) {
      return false;
    } else {
      const regex = new RegExp(this.regex);
      return !regex.test(value);
    }
  }

  checkCustom(value:string):boolean {
    if (!this.checkPattern(value)) {
    if (!this.custom || value.length == 0 || this.custoumRule == null) {
      return false;
    } else {
      return this.custoumRule(value);
    }}else {
      return false;
    }
  }
}
