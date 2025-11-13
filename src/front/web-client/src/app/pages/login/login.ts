import { Component, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LoginTemplate } from './login-template/login-template';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, LoginTemplate, LoaderComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public userName = signal('');
  public password = signal('');
  isLoggingIn = signal(false);
  passwordVisible = signal(false);
  userNameTouched = signal(false);
  passwordTouched = signal(false);

  errorUserName = computed(() => {
    const value = this.userName();

    return this.userNameTouched() && !value ? "Champ requis" : null;
  });

  errorPassword = computed(() => {
    const value = this.password();

    if(!this.passwordTouched()) return null;
    if(!value) return "Champ requis";
    if(value.length < 6) return "Minimum 6 caractères nécessaires.";

    return null;
  });

  isFormValid = computed(() => !this.errorUserName() && !this.errorPassword());

  onSubmit(): void {
    if(this.isFormValid()) {
      console.log('Connexion avec :', {
        username: this.userName(),
        password: this.password(),
      });
    }
    else {
      console.warn("Formulaire invalide");
    }
  }

  togglePasswordVisible(): void {
    this.passwordVisible.set(!this.passwordVisible());
  }
}
