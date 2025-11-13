import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  password = signal('');
  confirmPassword = signal('');
  passwordTouched = signal(false);
  confirmPasswordTouched = signal(false);
  token = signal('');
  email = signal('');
  loading = signal(false);

  ngOnInit(): void {
    const {token, email} = this.route.snapshot.queryParams;
    if(!token || !email) {
      this.router.navigate(['login']);
    }
    this.token.set(token);
    this.email.set(email);
  }

  errorPassword = computed(() =>{
    const value = this.password();
    if(!this.passwordTouched()) return null;
    if(!value) return "Champ requis";
    if(value.length < 6) return "Minimum 6 caractères.";

    return null;
  });

  errorConfirmPassword = computed(() => {
    const value = this.confirmPassword();
    if(!this.errorConfirmPassword()) return null;
    if(!value) return "Champ requis";
    if(value.length < 6) return "Minimum 6 caractères.";
    if(this.password() !== this.confirmPassword()) return "Les mots de passe ne correspondent pas";

    return null;
  });

  isFormValid = computed(() => !this.errorPassword() && !this.errorConfirmPassword());

  onSubmit(): void {
    if(!this.isFormValid()) return;

    this.loading.set(true);
  }

}
