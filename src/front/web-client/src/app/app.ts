import { AsyncPipe } from '@angular/common';
import { Component, Renderer2, signal, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('web-client');
  //private readonly translateService = inject(TranslateService);

  // async ngOnInit(): Promise<void> {
  //   const storedLang = localStorage.getItem('language');
  //   if(storedLang){
  //     this.translateService.use(storedLang);
  //   } else {
  //     const browserLang = this.translateService.getBrowserLang();
  //     const defaultLang = browserLang?.match(/en|fr/) ? browserLang : Language.en as string;
  //     this.translateService.use(defaultLang);
  //     localStorage.setItem('language', defaultLang);
  //   }
  // }



  //title = 'web-client';
  currentTheme?: string;
  translationsLoaded$: Observable<boolean>;

  constructor(
    translate: TranslateService,
    themeService: ThemeService,
    renderer: Renderer2,
    public viewRef: ViewContainerRef
  ) {
    translate.addLangs(['fr']);
    translate.setDefaultLang('fr');
    this.translationsLoaded$ = translate.use('fr').pipe(map(() => true));

    themeService.currentTheme$.subscribe((theme) => {
      if (this.currentTheme) {
        renderer.removeClass(document.body, this.currentTheme);
      }
      this.currentTheme = theme.toString();
      renderer.addClass(document.body, this.currentTheme);
    });
  }

}
