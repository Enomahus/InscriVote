import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideTranslations } from './config/provideTranslations';
import { CustomTitleStrategy } from './core/title/custom-title-strategy';
import { LanguageInterceptor } from './services/api/interceptors/lang-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([LanguageInterceptor])),
    provideTranslations(),
    provideRouter(routes),
    provideToastr(),
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    }
  ]
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader();
}
