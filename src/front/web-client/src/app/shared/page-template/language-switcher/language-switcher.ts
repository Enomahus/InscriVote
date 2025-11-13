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
langItems: { code: Language; displayText: string, flag: string }[];
  currentLang$: Observable<Language>;

//  languages: {langCode: Language; displayText: string}[] = [
//   {langCode: Language.fr, displayText: 'Français'},
//   {langCode: Language.en, displayText: 'English'},
//  ];
//  currentLang ='en';
 constructor(private translateService: TranslateService) {
  // const saveLanguage = localStorage.getItem('language');
  // if(saveLanguage) {
  //   this.currentLang = saveLanguage;
  // }


  // Voluntarily un-translated texts
    this.langItems = [
      { code: Language.fr, displayText: 'Français', flag: 'FR' },
      { code: Language.en, displayText: 'English', flag: 'GB' },
    ];
    this.currentLang$ = this.languageService.getCurrentLanguage();

 }

//   switchLanguage(langCode: string): void {
//    this.currentLang = langCode;
//    this.translateService.use(langCode);
//    localStorage.setItem('language', langCode);
//   }

// getFlag(langCode: string): string {
// const language = this.languages.find((lang) => lang.langCode === langCode);
// return language ? language.displayText : "";
// }

onLangChange(lang: Language): void {
  this.languageService.changeLanguage(lang);
}

}


export class LanguageSelectorComponent {



  constructor() {

  }
}
