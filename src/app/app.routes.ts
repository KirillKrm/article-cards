import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './pages/article/article.component';

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
