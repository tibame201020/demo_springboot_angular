import { Component, OnInit } from '@angular/core';
import { CustomFormService } from '../custom-form.service';
import { CustomInput } from '../model/customInput';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  formTitle:string = 'test title';
  customInputArray:CustomInput[] = [
    {
      fieldName: 's',
      required: true,
      pattern: true,
      regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      custom: false,
      custoumRule: function (value: string) {
        if (value.length == 2) {
          return false;
        } else {
          return true;
        }
      },
      requiredMsg: '',
      patternMsg: '',
      customMsg: ''
    },
    {
      fieldName: '2s',
      required: true,
      pattern: true,
      regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      custom: false,
      custoumRule: function (value: string) {
        if (value.length == 2) {
          return false;
        } else {
          return true;
        }
      },
      requiredMsg: '123',
      patternMsg: '',
      customMsg: '234'
    },
    {
      fieldName: 'field_3',
      required: false,
      pattern: true,
      regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      custom: false,
      custoumRule: function (value: string) {
        if (value.length == 2) {
          return false;
        } else {
          return true;
        }
      },
      requiredMsg: '123',
      patternMsg: '',
      customMsg: '234'
    }
  ];
  formBtn = { valid:"send the form",
              unvalid: 'Plz Enter The Necessary Info' }

  constructor(public customFormService:CustomFormService) { }

  ngOnInit(): void {
  }

  customClick():void {
    alert(JSON.stringify(this.customFormService.getForm()))
    console.log(this.customFormService.getForm())
  }

}
