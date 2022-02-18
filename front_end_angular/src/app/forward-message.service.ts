import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForwardMessageService {
  private message? : string;
  private nextRoute? : string;
  constructor() { }

  public setMessage(message:string):void {
      this.message = message;
  }

  public get getMessage(): string {
    return this.message || '';
  }

  public setNextRoute(nextRoute:string):void {
    this.nextRoute = nextRoute;
  }

  public get getNextRoute(): string {
    return this.nextRoute || '';
  }


}
