import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { CustomerChatComponent } from './components/customer-chat.component';
import { AuthService } from './shared/services/auth.service';
import { Role } from './shared/utils/enums/role.enum';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CustomerChatComponent,
  ],
  template: `
    <app-header />
    <div class="flex-auto flex flex-col">
      <router-outlet />
      @if(currentUserRole() === roles.CUSTOMER){
      <app-customer-chat />
      }
    </div>
    <app-footer />
  `,
  styles: `
    :host {
        min-height: 100vh;
        display:flex;
        flex-direction:column;
      }
  `,
})
export class AppComponent {
  readonly authService = inject(AuthService);
  readonly roles = Role;
  currentUserRole = this.authService.currentUserRole;
}
