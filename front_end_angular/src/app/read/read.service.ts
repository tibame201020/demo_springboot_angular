import { Article } from './../model/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  article!: Article;

  constructor(private http: HttpClient) { }

  getAllPublish(): Observable<Article[]> {
    return this.http.get<Article[]>(`api/read/all`);
  }

  setArticle(article:Article) {
    this.article = article;
  }

  getArticle() {
    return this.article;
  }
}
