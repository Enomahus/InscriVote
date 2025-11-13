import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../language-switcher/language-switcher';
import { BaseNavbarComponent } from '../base-navbar.component';

@Component({
  selector: 'app-navbar-mobile',
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    LanguageSwitcher
  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.scss',
})
export class NavbarMobileComponent extends BaseNavbarComponent {}
