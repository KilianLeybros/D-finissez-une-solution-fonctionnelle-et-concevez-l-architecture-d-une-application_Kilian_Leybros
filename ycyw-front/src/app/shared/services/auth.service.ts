import { computed, inject, Injectable, resource } from '@angular/core';
import { LoginForm, RegisterForm, User } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

const API_AUTH = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserResource = resource({
    loader: () => this.fetchCurrentUser(),
  });
  isLoggedin = computed(() => {
    const value = this.currentUserResource.value();
    if (value !== undefined) {
      return !!value;
    } else {
      return undefined;
    }
  });
  currentUser = computed(() => this.currentUserResource.value());
  currentUserRole = computed(() => this.currentUser()?.role);
  readonly router = inject(Router);

  async login(loginForm: LoginForm): Promise<User> {
    const response = await fetch(`${API_AUTH}/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      this.currentUserResource.reload();
      return body as User;
    } else {
      throw new Error(body.message);
    }
  }

  async register(registerForm: RegisterForm): Promise<User> {
    const response = await fetch(`${API_AUTH}/register`, {
      method: 'POST',
      body: JSON.stringify(registerForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      this.currentUserResource.reload();
      return body as User;
    } else {
      throw new Error(body.message);
    }
  }

  async fetchCurrentUser(): Promise<User> {
    return (await fetch(`${API_AUTH}/authenticated`)).json();
  }

  async logout() {
    await fetch(`${API_AUTH}/logout`, {
      method: 'DELETE',
    });
    this.currentUserResource.reload();
    this.router.navigateByUrl('/');
  }
}
