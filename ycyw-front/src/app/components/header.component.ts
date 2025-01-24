import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { Role } from 'app/core/enums/role.enum';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <h3 class="flex-auto text-bold text-lg"><a routerLink="/">YCYW</a></h3>
    <ul class="flex flex-row gap-16">
      @if(currentUserRole() === roles.ADMIN){
      <li>
        <a routerLink="/requests" routerLinkActive="active-link">requêtes</a>
      </li>
      } @if (isLoggedin()) {
      <li>
        <a (click)="logout()">se déconnecter</a>
      </li>
      } @else if (isLoggedin() === false) {
      <li>
        <a routerLink="/login">connexion</a>
      </li>
      }
    </ul>
  `,
  styles: `
  :host {
    display: flex;
    align-items: center;
    background-color: var(--primary);
    color: white;
    height: 56px;
    padding: 0 16px;
  }`,
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  readonly roles = Role;
  isLoggedin = this.authService.isLoggedin;
  currentUserRole = this.authService.currentUserRole;
  public logout() {
    this.authService.logout();
  }
}
