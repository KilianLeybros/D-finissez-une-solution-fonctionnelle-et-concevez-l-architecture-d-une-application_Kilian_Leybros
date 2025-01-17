import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <h3 class="flex-auto text-bold text-lg"><a routerLink="/">YCYW</a></h3>
    <ul class="flex flex-row gap-16">
      <li>
        <a routerLink="/requests" routerLinkActive="active-link">requêtes</a>
      </li>
      <li>
        <a routerLink="/login">connexion</a>
      </li>
      <li>
        <a href="#">se déconnecter</a>
      </li>
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
export class HeaderComponent {}
