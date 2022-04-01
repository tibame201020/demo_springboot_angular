import { RecordInfo } from 'src/app/model/recordInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PraticeModeService {

  record: any;
  assest: any;
  states: number = 0;

  constructor(private http: HttpClient) { }

  getSelfRecord(account: string): Observable<any> {
    return this.http.post<any>('api/practice/getSelfRecord', account);
  }

  createSelfRecord(account: string): Observable<any> {
    return this.http.post<any>('api/practice/createSelfRecord', account);
  }

  getPriceByCode(code: string): Observable<any> {
    return this.http.post<any>('api/twse/getPriceByCode', code);
  }

  buyStock(form: any): Observable<any> {
    return this.http.post<any>('api/practice/buy', form);
  }

  sellStock(form: any): Observable<any> {
    return this.http.post<any>('api/practice/sell', form);
  }

  setRecord(record: RecordInfo) {
    this.record = record;
    if (record) {
      this.states = 2;
    } else {
      this.states = 1;
    }
  }

  getRecord() {
    return this.record;
  }

  setAssest(assest: any) {
    this.assest = assest;
  }

  getAssest() {
    return this.assest;
  }

}
