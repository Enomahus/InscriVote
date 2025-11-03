import { inject, Injectable } from '@angular/core';
import { Language } from '@app/enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly languageStorageKey = 'chosenLanguage';
  private readonly currentLang = new BehaviorSubject<Language>(Language.en);

  constructor() {
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
    } else if (langStr.startsWith('cn')) {
      lang = Language.cn;
    }
    return lang;
  }

  changeLanguage(lang: Language): void {
    //this.translateService.currentLang = lang;
    this.translateService.use(lang);
    localStorage.setItem(this.languageStorageKey, lang);
    this.currentLang.next(lang);
  }

  getCurrentLanguage(): Observable<Language> {
    return this.currentLang.asObservable();
  }
}
