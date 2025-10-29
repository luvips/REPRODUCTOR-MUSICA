import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { SearchResultsComponent } from './features/search/components/search-results/search-results';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent,
  },
];
