import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'history', component: HistoryComponent },
];

export const publishRouter = routes;
