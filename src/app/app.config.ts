import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './shared/interceptors/api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([apiKeyInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
