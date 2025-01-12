import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@poc/core/layout/default-layout/default-layout.component';
import { FooterOnlyComponent } from '@poc/core/layout/footer-only/footer-only.component';
import { provideCustomerServices } from '@poc/features/customers/customers.providers';

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
      },
      {
        path: 'customers',
        loadChildren: () => import('@poc/features/customers/customers.routes').then(r => r.CUSTOMER_ROUTES),
        providers: [provideCustomerServices()]
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
