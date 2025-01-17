import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
            <label for="firstname" class="text-sm my-2">Prénom</label>
            <input
              class="w-full"
              id="firstname"
              type="text"
              formControlName="firstname"
            />
            @let firstname = registerForm.get('firstname');
            @if(firstname?.errors && registerForm.touched){
            <div class="validation-summary">
              <ul>
                @if(firstname?.hasError('required')){
                <li>Votre prénom est obligatoire</li>
                } @else if(firstname?.hasError('maxlength')){
                <li>Votre prénom est trop long</li>
                }
              </ul>
            </div>
            }
          </div>
          <div class="flex flex-col">
            <label for="lastname" class="text-sm my-2">Nom</label>
            <input
              class="w-full"
              id="lastname"
              type="text"
              formControlName="lastname"
            />
            @let lastname = registerForm.get('lastname'); @if(lastname?.errors
            && registerForm.touched){
            <div class="validation-summary">
              <ul>
                @if(lastname?.hasError('required')){
                <li>Votre nom est obligatoire</li>
                } @else if(lastname?.hasError('maxlength')){
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
          registerForm.touched){
          <div class="validation-summary">
            <ul>
              @if(email?.hasError('required')){
              <li>L'adresse email est obligatoire</li>
              } @else if(email?.hasError('email')){
              <li>Rentrer une adresse email valide</li>
              }@else if(email?.hasError('maxlength')){
              <li>Adresse email trop longue</li>
              }
            </ul>
          </div>
          }
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm my-2">Mot de passe</label>
          <input id="password" type="password" formControlName="password" />
          @let password = registerForm.get('password'); @if(password?.errors &&
          registerForm.touched){
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
        <div class="validation-summary">
          <ul>
            @if(error()){
            <li>
              {{ error() }}
            </li>
            }
          </ul>
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
  fb = inject(FormBuilder);
  error = signal<string | undefined>(undefined);
  registerForm = this.fb.group(
    {
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
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
    },
    { updateOn: 'submit' }
  );

  submit() {
    this.error.set(undefined);
    this.registerForm.markAsTouched();
    if (this.registerForm.valid) {
    }
  }
}
