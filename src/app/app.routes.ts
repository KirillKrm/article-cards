import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ArticleComponent } from './features/article/article.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Article Cards | Home',
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    title: 'Article Cards | Article',
  },
];
