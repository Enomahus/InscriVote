import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitleKey = this.buildTitle(snapshot);

    const projectTitle$ = this.translateService.get('global.projectTitle');

    if (routeTitleKey) {
      const routeTitle$ = this.translateService.get(routeTitleKey);
      forkJoin([projectTitle$, routeTitle$]).subscribe(([projectTitle, translateTitle]) => {
        this.translateService
          .get('global.titleTemplate', { title: translateTitle, project: projectTitle })
          .subscribe((finalTitle) => this.title.setTitle(finalTitle));
      });
    } else {
      projectTitle$.subscribe((projectTitle) => {
        this.translateService
          .get('global.noTitleTemplate', {
            project: projectTitle,
          })
          .subscribe((fallbackTitle) => this.title.setTitle(fallbackTitle));
      });
    }
  }
}
