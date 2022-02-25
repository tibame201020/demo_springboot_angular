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
  type:string ='';
  placeHolder:string = '';
  name:string='';
  value:string='';
  @Input() customInput?:CustomInput;
  @Input() text?:string;




  public customInputService: CustomInputService = new CustomInputService();

  constructor(private customFormService:CustomFormService) {
   }

  ngOnInit(): void {
    this.customInputService.fieldname = this.name;
    this.customInputService = new CustomInputService().set(this.customInput);
    this.setto();
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

  checkAllPass():boolean {
    if (this.checkRequired() || this.checkPattern() || this.checkCustom()) {
      return false;
    } else {
      return true;
    }
  }

  public setto(){
    this.customFormService.setNameAndValue(this.customInput?.fieldName, this.checkAllPass(), this.value);
  }

}
