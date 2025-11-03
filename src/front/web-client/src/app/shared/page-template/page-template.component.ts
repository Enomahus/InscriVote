import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-page-template',
    imports: [NavbarComponent, FooterComponent, BreadcrumbComponent, CommonModule, RouterOutlet],
    templateUrl: './page-template.component.html',
    styleUrl: './page-template.component.scss'
})
export class PageTemplateComponent {}
