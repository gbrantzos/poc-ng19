import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@poc/core/layout/default-layout/default-layout.component';
import { FooterOnlyComponent } from '@poc/core/layout/footer-only/footer-only.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('@poc/features/home/home.component').then(c => c.HomeComponent),
        data: {
          title: 'Αρχική'
        }
      }
    ]
    // canMatch: [isAuthenticated]
  },

  // Make sure this is the last route defined ...
  {
    path: '**',
    component: FooterOnlyComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@poc/core/components/not-found/not-found.component').then(c => c.NotFoundComponent)
      }
    ]
  }
];
