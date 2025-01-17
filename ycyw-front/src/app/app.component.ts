import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { CustomerChatComponent } from './components/customer-chat.component';
import { RequestComponent } from './views/request/request.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RequestComponent],
  template: `
    <app-header />
    <div class="flex-auto flex flex-col">
      <app-request />
      <!--<app-customer-chat />-->
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
export class AppComponent {}
