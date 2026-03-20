import { Routes } from '@angular/router';
import { DashboardContainer } from './components/dashboard-container/dashboard-container';

export const ANALYTICS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardContainer
  }
];