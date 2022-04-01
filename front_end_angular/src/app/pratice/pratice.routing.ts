
import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { MyselfComponent } from './myself/myself.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'myself', component: MyselfComponent },
  { path: 'history', component: HistoryComponent },
];

export const PraticeRouter = routes;
