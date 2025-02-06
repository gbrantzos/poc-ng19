import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@poc/app.config';
import { AppComponent } from '@poc/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
