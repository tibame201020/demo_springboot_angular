import { CustomInput, CustomInputBulider } from './../../model/form/customInput';
import { CustomFormBulider } from './../../model/form/customFrom';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  constructor() { }
  public createForm() {
    return new CustomFormBulider;
  }

  public createInput() {
    return new CustomInputBulider;
  }

}
