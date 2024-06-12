import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ArticlesService } from '../../core/articles.service';
import { Article } from '../../core/articles.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  articleId: string = '';
  article: Article | undefined;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.articleId = params['id'];
    });

    this.articlesService
      .getArticle(this.articleId)
      .subscribe((article) => (this.article = article));
  }

  navigateToHomepage() {
    this.router.navigate(['/']);
  }
}
