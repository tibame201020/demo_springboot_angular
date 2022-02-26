import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {
  private formObj:any = { "default" : false };
  private form:any = {};

  constructor() {
    this.formObj = { "default" : false };
    this.form = {};
  }

  public setNameAndValue(key:any, isValid:boolean, value:any) {
    if (isValid && !this.formObj.default) {
      delete this.formObj.default;
    }
    this.formObj[key] = isValid;
    this.form[key] = value;
  }
  public isFormValid():boolean {
    for (const key in this.formObj) {
      if (Object.prototype.hasOwnProperty.call(this.formObj, key)) {
        const element = this.formObj[key];
        if (!element) {
          return false
        }
      }
    }
    return true;
  }

  public getForm() {
    return this.form;
  }
}
