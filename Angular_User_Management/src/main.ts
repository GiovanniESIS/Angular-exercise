import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { SignIn } from './app/sign-in/sign-in';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
