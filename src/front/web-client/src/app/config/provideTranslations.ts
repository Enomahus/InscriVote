import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import packageJson from '../../../package.json';

class TranslationLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<Record<string, any>> {
    const baseI18nDirectory = '/assets/i18n';
    const directories = [baseI18nDirectory];
    const tasks$ = directories.map((d) => {
      const filename = `${d}/${lang}.json?v=${packageJson.version}`;
      const fallback = `${d}/en.json?v=${packageJson.version}`;

      return this.http.get<Record<string, any>>(filename).pipe(
        catchError((err) => {
          console.warn(`Fichier de traduction manquant : ${filename}`, err);
          return this.http.get<Record<string, any>>(fallback).pipe(
            catchError(() => {
              console.error(`Fichier de fallback manquant : ${fallback} `);
              return of({});
            })
          );
        })
      );
    });

    return forkJoin(tasks$).pipe(
      map((translates) => {
        return translates.reduce((prev, curr) => {
          return { ...prev, ...curr };
        }, {});
      })
    );
  }
}

export const provideTranslations = (): EnvironmentProviders =>
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationLoader,
        deps: [HttpClient],
      },
    })
  );
