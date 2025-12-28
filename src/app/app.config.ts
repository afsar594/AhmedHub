// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { LoaderInterceptor } from './service/interceptors/loader.interceptor';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([LoaderInterceptor])),
  ],
};
