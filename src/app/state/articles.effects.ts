import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ArticlesService } from '../core/articles.service';
import * as ArticlesActions from './articles.actions';

@Injectable()
export class ArticlesEffects {
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      mergeMap(() =>
        this.articlesService.getArticles().pipe(
          map((articles) => ArticlesActions.loadArticlesSuccess({ articles })),
          catchError((error) =>
            of(ArticlesActions.loadArticlesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService
  ) {}
}
