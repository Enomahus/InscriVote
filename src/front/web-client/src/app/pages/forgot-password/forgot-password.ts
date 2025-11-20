import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LoginTemplate } from '../login/login-template/login-template';

const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TranslateModule,
    LoginTemplate,
    LoaderComponent,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  public email = signal('');
  emailTouched = signal(false);
  loading = signal(false);
  mailAlreadySent = signal(false);

  errorEmail = computed(() => {
    const emailValue = this.email();

    if (!this.emailTouched()) return null;
    if (!emailValue) return 'Champs requis';

    return patternEmail.test(emailValue) ? null : 'Email invalide';
  });

  isFormValid = computed(() => !this.errorEmail());

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.loading.set(true);

    console.log('Password oublié pour email :', {
      Email: this.email(),
    });
  }
}
