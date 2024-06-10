import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Article {
  id: string;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: any[];
  events: any[];
}

export interface ArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private apiUrl = environment.API_URL;
  private articlesUrl = `${this.apiUrl}/v4/articles`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get<ArticlesResponse>(this.articlesUrl).pipe(
      map((response: ArticlesResponse) => {
        return response.results;
      })
    );
  }
}
