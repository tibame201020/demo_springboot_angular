
import { Component, Input, OnInit } from '@angular/core';
import { CustomInput } from 'src/app/model/form/customInput';
import { customInputDefaultSetting } from 'src/app/model/form/defalut-custom-setting';
import { CustomFormService } from '../custom-form.service';



@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  @Input() customInput?: CustomInput;
  @Input() service?: CustomFormService;

  fieldName: string = '';
  value: string = '';
  require_err: string = '';
  regexs_err: string = '';
  custom_err: string = '';

  constructor(private customFormService: CustomFormService) {
  }

  ngOnInit(): void {

    const inputSetting = this.transInput(this.customInput);
    if (inputSetting) {
      this.customInput = inputSetting;
    }


    this.fieldName = this.customInput?.fieldName ? this.customInput?.fieldName : '';
    this.value = this.customInput?.value ? this.customInput?.value : '';
    this.require_err = this.customInput?.require.errorMsg ? this.customInput?.require.errorMsg : '';
    this.regexs_err = this.customInput?.regexs.errorMsg ? this.customInput?.regexs.errorMsg : '';
    this.custom_err = this.customInput?.customRule.errorMsg ? this.customInput?.customRule.errorMsg : '';
    this.customFormService = this.service ? this.service : this.customFormService;
    this.setToTheForm();
  }

  checkRequired(): boolean {
    const value = this.value;
    if (!this.checkPattern() || !this.checkCustom()) {
      if (!this.customInput?.require.valid) {
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

  checkPattern(): boolean {
    const value = this.value;
    if (!this.customInput?.regexs.valid || value.length == 0) {
      return false;
    } else {
      const regex = new RegExp(this.customInput.regexs.pattern);
      return !regex.test(value);
    }
  }

  checkCustom(): boolean {
    const value = this.value;
    if (!this.checkPattern()) {
      if (!this.customInput?.customRule.valid || value.length == 0 || !this.customInput.customRule.rule) {
        return false;
      } else {
        return !this.customInput.customRule.rule(value);
      }
    } else {
      return false;
    }
  }

  checkAllPass(): boolean {
    if (this.checkRequired() || this.checkPattern() || this.checkCustom()) {
      return false;
    } else {
      return true;
    }
  }

  setToTheForm() {
    const key = this.customInput?.fieldName;
    this.customFormService.setNameAndValue(key, this.checkAllPass(), this.value);
  }

  transInput(customInput: any):CustomInput {
    let formSetting:CustomInput = Object.assign({}, customInputDefaultSetting, customInput);
    return formSetting;
  }

}
