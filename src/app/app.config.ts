/* eslint-disable no-magic-numbers */
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import localeEl from '@angular/common/locales/el';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { busyIndicatorInterceptor } from '@poc/core/interceptors/busy-indicator.interceptor';
import { routes } from './app.routes';

export function initializeApp() {
  return (): Promise<void> => {
    return new Promise<void>(resolve => {
      // console.log('Initialization complete');
      setTimeout(() => {
        resolve();
      }, 1500); // Simulate a 5-second initialization task
    });
  };
}

// registerLocaleData(localeEl, 'el');
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideLuxonDateAdapter(),
    provideHttpClient(withInterceptors([busyIndicatorInterceptor]))
    //provideAppInitializer(initializeApp())
    // { provide: MAT_DATE_LOCALE, useValue: 'el' }
  ]
};
