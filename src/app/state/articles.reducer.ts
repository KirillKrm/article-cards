import { Action, createReducer, on } from '@ngrx/store';

import * as ArticlesActions from './articles.actions';
import { Article } from '../core/articles.service';

export interface ArticlesState {
  articles: Article[];
  error: any;
}

export const initialState: ArticlesState = {
  articles: [],
  error: null,
};

const _articlesReducer = createReducer(
  initialState,
  on(ArticlesActions.loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
  })),
  on(ArticlesActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function articlesReducer(
  state: ArticlesState | undefined,
  action: Action
) {
  return _articlesReducer(state, action);
}
