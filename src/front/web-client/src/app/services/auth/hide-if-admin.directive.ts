import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appHideIfAdmin]',
})
export class HideIfAdminDirective {
  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authService: AuthService
  ) {
    this.authService
      .isAdmin()
      .pipe(take(1))
      .subscribe((isAdmin) => {
        if (!isAdmin) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
