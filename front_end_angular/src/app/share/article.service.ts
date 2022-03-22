import { Article } from './../model/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  editData?: Article;

  constructor(private http: HttpClient) { }

  save(article: Article): Observable<any> {
    return this.http.post<any>('api/publish/save', article);
  }

  delete(article: Article): Observable<any> {
    return this.http.post<any>('api/publish/deleteArticle', article);
  }
  restore(article: Article): Observable<any> {
    return this.http.post<any>('api/publish/restoreArticle', article);
  }

  findByAccount(account: string): Observable<Article[]> {
    return this.http.post<Article[]>('api/publish/manage', account);
  }

  saveEditData(data:Article) {
    this.editData = data;
  }

  getEditData() {
    return this.editData;
  }

  clearEditData() {
    this.editData = undefined;
  }

}
