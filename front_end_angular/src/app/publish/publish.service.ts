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
}
