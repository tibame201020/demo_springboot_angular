import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private hide:boolean = true;
  constructor() { }

  hideSideBar() {
    this.hide = true;
  }
  showSideBar() {
    this.hide = false;
  }
  hideOrShow() {
    return this.hide;
  }
}
