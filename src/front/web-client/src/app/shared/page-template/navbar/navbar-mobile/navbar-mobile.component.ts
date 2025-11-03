import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HideIfAdminDirective } from '@app/services/auth/hide-if-admin.directive';
import { PermissionDirective } from '@app/services/auth/permission.directive';
import { TranslateModule } from '@ngx-translate/core';
import { BaseNavbarComponent } from '../base-navbar.component';

@Component({
  selector: 'app-navbar-mobile',
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    PermissionDirective,
    HideIfAdminDirective,

  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.scss',
})
export class NavbarMobileComponent extends BaseNavbarComponent {}
