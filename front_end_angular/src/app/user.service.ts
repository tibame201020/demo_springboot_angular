import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public registerUser(user:User) : Observable<User> {
    return this.http.post<User>(`api/user/register`, user);
  }

  public validUserAccount (account:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/register/isAlreadyHaveAccount`, account);
  }
  public validUserMail (mail:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/register/isAlreadyHaveMail`, mail);
  }
  public validUserPhone (phone:string) : Observable<Boolean> {
    return this.http.post<Boolean>(`api/user/register/isAlreadyHavePhone`, phone);
  }

  public enableAccount (token:string) : Observable<User> {
    return this.http.post<User>(`api/user/enableTheAccount`, token);
  }

  public checkRestPwdInfo (user:User) : Observable<any> {
    return this.http.post<any>('api/user/reset_password_confirm', user);
  }

  public checkResetToken (token:string) : Observable<any> {
    return this.http.post<any>(`api/user/checkResetToken`, token);
  }

  public resetPwd (user:User) : Observable<User> {
    return this.http.post<User>(`api/user/resetPwd`, user);
  }


}
