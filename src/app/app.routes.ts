import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'chatbot',
    pathMatch: 'full'
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./features/chatbot/chatbot.routes').then(m => m.CHATBOT_ROUTES)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES)
  },
  {
    path: '404',
    loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFound)
  },
  {
    path: '**',
    redirectTo: '404'
  }

];
