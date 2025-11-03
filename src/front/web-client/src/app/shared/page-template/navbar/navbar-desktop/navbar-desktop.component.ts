import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HideIfAdminDirective } from '@app/services/auth/hide-if-admin.directive';
import { PermissionDirective } from '@app/services/auth/permission.directive';
import { TranslateModule } from '@ngx-translate/core';
import { BaseNavbarComponent } from '../base-navbar.component';

@Component({
  selector: 'app-navbar-desktop',
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    PermissionDirective,
    HideIfAdminDirective,
  ],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.scss',
})
export class NavbarDesktopComponent extends BaseNavbarComponent {}
