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
        loadComponent: async () => (await import('@poc/features/home/home.component')).HomeComponent,
        data: {
          title: 'Αρχική'
        }
      },
      {
        path: 'customers',
        loadChildren: async () => (await import('@poc/features/customers/customers.routes')).CUSTOMER_ROUTES,
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
        loadComponent: async () =>
          (await import('@poc/core/components/not-found/not-found.component')).NotFoundComponent
      }
    ]
  }
];
