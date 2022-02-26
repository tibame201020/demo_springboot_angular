import { customFromDefaultSetting } from './defalut-custom-form-setting';
import { CustomInput } from "./customInput";

export interface CustomForm {
  formTitle: string | undefined;
  customInputArray: CustomInput[];
  formBtn: {
    valid: string,
    unvalid: string
  },
  submitFunction: any
}

export class CustomFormBulider implements CustomForm {
  constructor() {
  }
  formTitle: string = 'defalut title';
  customInputArray: CustomInput[] = [];
  formBtn: { valid: string; unvalid: string; } = { valid:"send the form",unvalid:"Plz Enter The Necessary Info"};
  submitFunction: any;


  setTitle(title: string): CustomFormBulider {
    this.formTitle = title;
    return this;
  }

  setInputArray(customInputArray: CustomInput[]): CustomFormBulider {
    this.customInputArray = customInputArray;
    return this;
  }

  addInput(input:CustomInput):CustomFormBulider {
    this.customInputArray.push(input);
    return this;
  }

  setFormBtnValid(formBtnValid: string): CustomFormBulider {
    this.formBtn.valid = formBtnValid;
    return this;
  }

  setFormBtnunvalid(formBtnunvalid: string): CustomFormBulider {
    this.formBtn.unvalid = formBtnunvalid;
    return this;
  }

  setSubmitFunction(submitFunction: any): CustomFormBulider {
    this.submitFunction = submitFunction;
    return this;
  }

  bulid(): CustomForm {
    let DefaultSetting = customFromDefaultSetting;
    let formSetting:CustomForm = Object.assign({}, customFromDefaultSetting, this);
    if (this.customInputArray) {
      formSetting.customInputArray = [];
        const array = this.customInputArray;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (!element.fieldName) {
            element.fieldName = 'defalutFieldName' + (index + 1);
          }
          formSetting.customInputArray.push(Object.assign({}, DefaultSetting, element));
        }
    }
    return formSetting;
  }

}
