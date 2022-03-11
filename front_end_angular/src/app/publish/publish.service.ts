import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(private http: HttpClient) { }

  getCodeNmLs(code: string): Observable<any> {
    return this.http.post<any>('api/twse/quickSearch', code);
  }

  getBasicInfo(code: string, beginDate: any, endDate: any): Observable<any> {
    if (endDate == null) {
      endDate = new Date(beginDate.getTime() - 1000*60*60*24*30);
    }
    return this.http.post<any>('api/twse/getBasicInfo', { code, "beginDate": beginDate, "endDate": endDate });
  }
}
