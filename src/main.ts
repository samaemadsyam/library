import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// src/main.ts
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
