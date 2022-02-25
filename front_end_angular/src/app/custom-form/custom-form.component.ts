import { Component, OnInit } from '@angular/core';
import { CustomFormService } from '../custom-form.service';
import { CustomInput } from '../model/customInput';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  formTitle: string = 'test title';
  customInputArray: CustomInput[] = [
    {
      fieldName: 'text1',
      type: 'text',
      value: '',
      palceholder: '',
      require: {
        valid: true,
        errorMsg: 'this field is required'
      },
      regexs: {
        valid: false,
        pattern: undefined,
        errorMsg: 'the enter value is un-correct'
      },
      customRule: {
        valid: false,
        rule: undefined,
        errorMsg: 'this enter value is un-valid'
      }
    },
    {
      fieldName: 'text2',
      type: 'text',
      value: '',
      palceholder: '',
      require: {
        valid: true,
        errorMsg: 'this field is required'
      },
      regexs: {
        valid: true,
        pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
        errorMsg: 'the enter value is un-correct'
      },
      customRule: {
        valid: false,
        rule: null,
        errorMsg: 'this enter value is un-valid'
      }
    },
    {
      fieldName: 'text3',
      type: 'text',
      value: '',
      palceholder: '',
      require: {
        valid: true,
        errorMsg: 'this field is required'
      },
      regexs: {
        valid: false,
        pattern: null,
        errorMsg: 'the enter value is un-correct'
      },
      customRule: {
        valid: true,
        rule: function (value: string) {
          if (value.length == 2) {
            return false;
          } else {
            return true;
          }
        },
        errorMsg: 'this enter value is un-valid'
      }
    }
  ];
  formBtn = {
    valid: "send the form",
    unvalid: 'Plz Enter The Necessary Info'
  }

  constructor(public customFormService: CustomFormService) { }

  ngOnInit(): void {
  }

  customClick(): void {
    alert(JSON.stringify(this.customFormService.getForm()))
    console.log(this.customFormService.getForm())
  }

}
