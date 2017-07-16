import { FiguresComponent } from './figures/figures.component';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content/';
import { Routes } from '@angular/router';
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'figures/:id', component: FiguresComponent },
  { path: '**', component: NoContentComponent }
];
