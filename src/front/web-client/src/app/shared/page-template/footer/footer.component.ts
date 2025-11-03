import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import packageJson from '../../../../../package.json';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, FormsModule, TranslateModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  appVersion = packageJson.version;
}
