import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ArticlesService } from '../../api/articles.service';
import { Article } from '../../types/Article';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  articleId: string = '';
  article: Article | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.articleId = params['id'];
      });

    this.articlesService
      .getArticle(this.articleId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((article) => (this.article = article));
  }

  navigateToHomepage() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
