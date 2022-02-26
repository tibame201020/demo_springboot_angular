import { Component, Input, OnInit } from '@angular/core';
import { CustomForm } from 'src/app/model/form/customFrom';
import { customFromDefaultSetting } from 'src/app/model/form/defalut-custom-form-setting';
import { customInputDefaultSetting } from 'src/app/model/form/defalut-custom-setting';
import { CustomFormService } from '../custom-form.service';




@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  @Input() formBean?:any;

  public customFormService: CustomFormService = new CustomFormService;
  public formSetting:CustomForm = customFromDefaultSetting;
  constructor() {}

  ngOnInit(): void {
    const formSetting = this.transInput(this.formBean);
    if (formSetting) {
      this.formSetting = formSetting;
    }
  }

  customClick(): void {
    this.formSetting.submitFunction(this.customFormService.getForm());
  }

  transInput(formBean:any):CustomForm {
    let formSetting:CustomForm = Object.assign({}, customFromDefaultSetting, formBean);
    if (formBean.customInputArray) {
      formSetting.customInputArray = [];
        const array = formBean.customInputArray;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (!element.fieldName) {
            element.fieldName = 'defalutFieldName' + (index + 1);
          }
          formSetting.customInputArray.push(Object.assign({}, customInputDefaultSetting, element));
        }
    }
    return formSetting;
  }

}
