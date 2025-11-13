import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageSwitcher } from '@app/shared/page-template/language-switcher/language-switcher';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [CommonModule, LanguageSwitcher],
  templateUrl: './login-template.html',
  styleUrl: './login-template.scss',
})
export class LoginTemplate {

}
