/* eslint-disable no-magic-numbers */
import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAppInitializer(initializeApp())
  ]
};
