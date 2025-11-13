import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Language } from '../../../enums/language.enum';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private readonly languageService = inject(LanguageService);
  langItems: { code: Language; displayText: string; flag: string }[];
  currentLang$: Observable<Language>;

  constructor(private translateService: TranslateService) {
    // Voluntarily un-translated texts
    this.langItems = [
      { code: Language.fr, displayText: 'Français', flag: 'FR' },
      { code: Language.en, displayText: 'English', flag: 'GB' },
    ];
    this.currentLang$ = this.languageService.getCurrentLanguage();
  }

  onLangChange(lang: Language): void {
    this.languageService.changeLanguage(lang);
  }
}
