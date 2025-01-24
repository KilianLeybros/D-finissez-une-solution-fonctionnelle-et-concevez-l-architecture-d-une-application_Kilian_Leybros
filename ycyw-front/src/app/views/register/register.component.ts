import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterForm } from 'app/core/interfaces';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="card flex flex-col p-24">
      <div class="flex justify-content-center mb-20">
        <h2>Inscription</h2>
      </div>
      <form
        style="width: 350px;"
        [formGroup]="registerForm"
        (submit)="submit()"
        class="flex flex-col gap-16"
      >
        <div>
          <span class="text-sm">
            Vous avez deja un compte ?
            <a routerLink="/login" class="text-primary">Connectez vous</a></span
          >
        </div>
        <div class="flex flex-row gap-12">
          <div class="flex flex-col">
            <label for="firstName" class="text-sm my-2">Prénom</label>
            <input
              class="w-full"
              id="firstName"
              type="text"
              formControlName="firstName"
            />
            @let firstName = registerForm.get('firstName');
            @if(firstName?.errors && (registerForm.touched && formSubmitted())){
            <div class="validation-summary">
              <ul>
                @if(firstName?.hasError('required')){
                <li>Votre prénom est obligatoire</li>
                } @else if(firstName?.hasError('maxlength')){
                <li>Votre prénom est trop long</li>
                }
              </ul>
            </div>
            }
          </div>
          <div class="flex flex-col">
            <label for="lastName" class="text-sm my-2">Nom</label>
            <input
              class="w-full"
              id="lastName"
              type="text"
              formControlName="lastName"
            />
            @let lastName = registerForm.get('lastName'); @if(lastName?.errors
            && (registerForm.touched && formSubmitted())){
            <div class="validation-summary">
              <ul>
                @if(lastName?.hasError('required')){
                <li>Votre nom est obligatoire</li>
                } @else if(lastName?.hasError('maxlength')){
                <li>Votre nom est trop long</li>
                }
              </ul>
            </div>
            }
          </div>
        </div>
        <div class="flex flex-col">
          <label for="email" class="text-sm my-2">Email</label>
          <input id="email" type="email" formControlName="email" />
          @let email = registerForm.get('email'); @if(email?.errors &&
          (registerForm.touched && formSubmitted())){
          <div class="validation-summary">
            <ul>
              @if(email?.hasError('required')){
              <li>L'adresse email est obligatoire</li>
              } @else if(email?.hasError('email')){
              <li>Rentrez une adresse email valide</li>
              }@else if(email?.hasError('maxlength')){
              <li>Adresse email trop longue</li>
              } @else if (email?.errors?.['emailAlreadyUsed']) {
              <p class="error">Adresse email déjà utilisée</p>
              }
            </ul>
          </div>
          }
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm my-2">Mot de passe</label>
          <input id="password" type="password" formControlName="password" />
          @let password = registerForm.get('password'); @if(password?.errors &&
          (registerForm.touched && formSubmitted())){
          <div class="validation-summary">
            <ul>
              @if(password?.hasError('required')){
              <li>Le mot de passe est obligatoire</li>
              } @else if(password?.hasError('minlength')){
              <li>Mot de passe trop court</li>
              }@else if(password?.hasError('pattern')){
              <li>
                Le mot de passe doit contenir au moins une minuscule, une
                majuscule, un chiffre et un caractère spécial
              </li>
              }
            </ul>
          </div>
          }
        </div>

        <div class="flex justify-content-center mt-20">
          <button type="submit" class="btn btn-primary">S'inscrire</button>
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
export class RegisterComponent {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  formSubmitted = signal(false);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(100)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-]{0,}$'
        ),
      ],
    ],
  });

  async submit() {
    this.formSubmitted.set(true);
    if (this.registerForm.valid) {
      const registerForm = this.registerForm.getRawValue() as RegisterForm;
      try {
        const user = await this.authService.register(registerForm);
        this.router.navigateByUrl('/');
      } catch (e: any) {
        if (e.message === 'Adresse email déjà utilisée') {
          this.registerForm.get('email')!.setErrors({ emailAlreadyUsed: true });
        }
      }
    }
  }
}
