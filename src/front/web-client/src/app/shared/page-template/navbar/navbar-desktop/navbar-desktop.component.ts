import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../language-switcher/language-switcher';
import { BaseNavbarComponent } from '../base-navbar.component';

@Component({
  selector: 'app-navbar-desktop',
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    LanguageSwitcher
  ],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.scss',
})
export class NavbarDesktopComponent extends BaseNavbarComponent {}
