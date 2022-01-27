import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

    rtn.pipe(tap((data:Boolean) => {this.loginStatus = data}));

    return rtn;
  }

  public registerUser(user:User) : Observable<User> {
    return this.http.post<User>(`api/user/register`, user);
  }

  public validUserAccount (account:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/isAlreadyHaveAccount`, account);
  }
  public validUserMail (mail:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/isAlreadyHaveMail`, mail);
  }
  public validUserPhone (phone:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/isAlreadyHavePhone`, phone);
  }


}
