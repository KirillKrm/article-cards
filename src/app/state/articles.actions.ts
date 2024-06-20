import { createAction, props } from '@ngrx/store';
import { Article } from '../types/Article';

export const loadArticles = createAction('[Articles] Load Articles');
export const loadArticlesSuccess = createAction(
  '[Articles] Load Articles Success',
  props<{ articles: Article[] }>()
);
export const loadArticlesFailure = createAction(
  '[Articles] Load Articles Failure',
  props<{ error: any }>()
);
