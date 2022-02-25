import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router,) {
    let storage_user = localStorage.getItem('user') || '{}';
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(storage_user));
    this.currentUser = this.currentUserSubject.asObservable();
   }


  public validUser(user:User) : Observable<Boolean> {
    let rtn = this.http.post<any>(`api/user/login`, user);
    rtn.subscribe(
        (res:any) => {
          if (res.access_token) {
            res.user_info.access_token = res.access_token;
            res.user_info.refresh_token = res.refresh_token;
            res.user_info.pwd = '';
            res.user_info.changePwd = '';
            this.currentUserSubject.next(res.user_info);
            localStorage.setItem('user', JSON.stringify(res.user_info));
          } else {
            this.currentUserSubject.next(null);
            localStorage.removeItem('user');
          }
        }
    )

    return rtn;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['home']);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  isLogIn():Boolean {
    let rtn = false;
    this.getCurrentUser().subscribe(
      user => {
        if (user != null) {
          if (user.access_token != null) {
            rtn = true;
          }
      }
    }
    )
    return rtn;
  }

  loginByMailCheck(mail:string):Observable<any>{
    return this.http.post<any>(`api/user/requiredUseMailLogin`, mail);
  }


  test():Observable<string>{
    return this.http.post<string>(`api/user/testMock`, "");
  }
}
