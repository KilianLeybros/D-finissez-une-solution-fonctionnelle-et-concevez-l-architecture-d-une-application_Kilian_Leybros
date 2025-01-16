import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <div class="flex-auto flex flex-col"></div>
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
