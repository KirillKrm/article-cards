import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Article } from '../types/Article';
import { ArticlesResponse } from '../types/ArticlesResponse';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private apiUrl = environment.apiUrl;
  private articlesUrl = `${this.apiUrl}/v4/articles`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    const params = { limit: 12 };

    return this.http.get<ArticlesResponse>(this.articlesUrl, { params }).pipe(
      map((response: ArticlesResponse) => {
        return response.results;
      })
    );
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.articlesUrl}/${id}`);
  }
}
