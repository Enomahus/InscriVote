import { Injectable } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Language, Locale } from '../../app/enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageStorageKey = 'language';
  private readonly currentLang = new BehaviorSubject<Language>(Language.en);
  private readonly translateService: TranslateService;


  constructor(translate: TranslateService) {
     this.translateService = translate;

     //this.translateService.use(Language.en as string);
     this.translateService.setDefaultLang(Language.en);
    const storedLanguage: string | null = localStorage.getItem(this.languageStorageKey);
    if (storedLanguage) {
      this.changeLanguage(this.getLanguageFromString(storedLanguage));
    } else {
      this.useBrowserLanguage();
    }

  }

  private useBrowserLanguage(): void {
    const browserLocale = navigator.languages?.length ? navigator.languages[0] : navigator.language;
    const lang = this.getLanguageFromString(browserLocale);
    this.changeLanguage(lang);
  }

  private getLanguageFromString(langStr: string): Language {
    let lang = Language.en;
    if (langStr.startsWith('fr')) {
      lang = Language.fr;
    }
    return lang;
  }

  changeLanguage(lang: Language): void {
    localStorage.setItem(this.languageStorageKey, lang);
    this.translateService.use(lang as string);
    this.currentLang.next(lang);
  }

  getCurrentLanguage(): Observable<Language> {
    return this.currentLang.asObservable();
  }

  getCurrentLocale(): Observable<Locale> {
    return this.currentLang.pipe(
      map((lang) => {
        switch (lang) {
          case Language.fr: return Locale.fr;
          case Language.en: return Locale.en;
        }
      })
    );
  }


}

@Injectable()
export class MyMissingTranslationHandler implements MissingTranslationHandler {
   handle(params: MissingTranslationHandlerParams): string {
    return 'somme value';
  }
}
