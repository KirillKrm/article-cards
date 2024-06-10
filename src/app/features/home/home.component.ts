import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Article } from '../../core/articles.service';
import { ArticlesState } from '../../state/articles.reducer';
import { loadArticles } from '../../state/articles.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]>;
  error$: Observable<any>;

  constructor(
    private store: Store<{ articles: ArticlesState }>,
    private router: Router
  ) {
    this.articles$ = this.store.pipe(
      select((state) => state.articles.articles)
    );
    this.error$ = this.store.pipe(select((state) => state.articles.error));
  }

  ngOnInit(): void {
    this.store.dispatch(loadArticles());
  }
}
