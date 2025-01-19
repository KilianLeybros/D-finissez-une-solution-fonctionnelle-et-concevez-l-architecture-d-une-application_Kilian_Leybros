import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginForm } from 'app/shared/interfaces/auth.interface';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="card flex flex-col p-24">
      <div class="flex justify-content-center mb-20">
        <h2>Connexion</h2>
      </div>
      <form
        style="width: 350px;"
        [formGroup]="loginForm"
        (submit)="submit()"
        class="flex flex-col gap-16"
      >
        <div class="flex flex-col">
          <label for="email" class="text-sm my-2">Email</label>
          <input id="email" type="email" formControlName="email" />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm my-2">Mot de passe</label>
          <input id="password" type="password" formControlName="password" />
        </div>
        <div class="validation-summary">
          <ul>
            @let email = loginForm.get('email'); @let password =
            loginForm.get('password'); @if((password!.errors || email!.errors)
            && (loginForm.touched && formSubmitted())){
            <li>Veuillez rentrer vos identifiants</li>
            } @if (loginForm.errors?.['general']) {
            <li>Mot de passe ou email incorrect</li>
            }
          </ul>
        </div>
        <div class="flex justify-content-center mt-20">
          <button type="submit" class="btn btn-primary">Se connecter</button>
        </div>
        <div>
          <span class="text-sm"
            >Vous n'avez pas de compte ?
            <a routerLink="/register" class="text-primary"
              >Créer un compte</a
            ></span
          >
        </div>
      </form>
    </div>
  `,
  styles: `:host{
    display: flex;
    justify-content:center;
    align-items: center;
    flex: 1 1 auto;
  }
  a{
    padding:0;
  }
  `,
})
export class LoginComponent {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  formSubmitted = signal(false);
  error = signal<string | undefined>(undefined);
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  async submit() {
    this.formSubmitted.set(true);
    if (this.loginForm.valid) {
      const loginForm = this.loginForm.getRawValue() as LoginForm;
      try {
        const user = await this.authService.login(loginForm);
        this.router.navigateByUrl('/');
      } catch (e: any) {
        console.log(e);
        this.loginForm.setErrors({ general: true });
      }
    }
  }
}
