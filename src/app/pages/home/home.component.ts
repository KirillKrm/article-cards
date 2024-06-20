import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Article } from '../../types/Article';
import { ArticlesState } from '../../state/articles.reducer';
import { loadArticles } from '../../state/articles.actions';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';

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
    FormsModule,
    HighlightPipe,
    TruncatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  articles$: Observable<Article[]>;
  error$: Observable<any>;
  private unsubscribe$ = new Subject<void>();

  filterText: string = '';
  filteredArticles: Article[] = [];

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
    this.articles$.pipe(takeUntil(this.unsubscribe$)).subscribe((articles) => {
      this.filteredArticles = articles;
    });
  }

  filterArticles(): void {
    this.articles$.pipe(takeUntil(this.unsubscribe$)).subscribe((articles) => {
      const lowerCaseFilter = this.filterText.toLowerCase();

      this.filteredArticles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerCaseFilter) ||
          article.summary.toLowerCase().includes(lowerCaseFilter)
      );
    });
  }

  navigateToArticle(article: Article): void {
    this.router.navigate(['/article', article.id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
