import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginStatus:Boolean = false;

  constructor(private http: HttpClient) { }


  public validUser(user:User) : Observable<Boolean> {
    let rtn = this.http.post<Boolean>(`api/user/loginValid`, user);

    rtn.subscribe((res:Boolean) => { this.loginStatus = res} );

    return rtn;
  }

  public registerUser(user:User) : Observable<User> {
    return this.http.post<User>(`api/user/register`, user);
  }


}
