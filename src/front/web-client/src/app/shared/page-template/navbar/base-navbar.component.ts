import { Component, DestroyRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Language } from '@app/enums/language.enum';
import { LanguageService } from '@app/services/language.service';
import { filter, Observable, tap } from 'rxjs';

@Component({
  standalone: true,
  template: '',
})
export abstract class BaseNavbarComponent {
  @Input({ required: true }) userName$!: Observable<string>;

  @Output() logout = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  dropdownOpen = false;
  langItems: { lang: Language; displayText: string }[];
  currentLang$: Observable<Language>;

  constructor() {
    // Hide dropdown after having navigated to another page.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap(() => {
          this.dropdownOpen = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // Voluntarily un-translated texts
    this.langItems = [
      { lang: Language.fr, displayText: 'Français' },
      { lang: Language.en, displayText: 'English' },
      { lang: Language.cn, displayText: '中文' },
    ];
    this.currentLang$ = this.languageService.getCurrentLanguage();
  }

  isRouteMatching(route: string): boolean {
    return this.router.url.includes(route);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    // Hide dropdown after having clicked outside.
    const targetElement = event.target as HTMLElement;
    if (
      (!targetElement.closest('.dropdown-content') && !targetElement.closest('.dropbtn')) ||
      targetElement.offsetParent?.className === 'dropdown-content'
    ) {
      this.dropdownOpen = false;
    }
  }

  langChange(lang: Language): void {
    this.languageService.changeLanguage(lang);
  }
}
