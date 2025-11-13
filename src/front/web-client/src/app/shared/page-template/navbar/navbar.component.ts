import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, tap } from 'rxjs';
import { NavbarDesktopComponent } from './navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    FormsModule,
    NavbarDesktopComponent,
    NavbarMobileComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isToggleMobileMenu = false;
  //userName$: Observable<string>;

  // private readonly authService = inject(AuthService);
  // private readonly currentUserService = inject(CurrentUserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    //this.userName$ = this.currentUserService.currentUserName$.pipe(takeUntilDestroyed(this.destroyRef));

    // Hide mobile menu after having navigated to another page.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap(() => {
          this.isToggleMobileMenu = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  // handleLogout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  toggleMobileMenu(): void {
    this.isToggleMobileMenu = !this.isToggleMobileMenu;
  }
}
