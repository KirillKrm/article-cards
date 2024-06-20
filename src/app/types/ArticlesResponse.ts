import { Article } from './Article';

export interface ArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: Article[];
}
