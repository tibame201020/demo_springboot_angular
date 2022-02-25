import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {
  private formCehck?:boolean;
  constructor() { }
  public setformCehck(flag:boolean) {
    this.formCehck = flag;
    console.log('this is ' + this.formCehck);
  }
  public getFormCheck():boolean {
    return this.formCehck || false;
  }
}
