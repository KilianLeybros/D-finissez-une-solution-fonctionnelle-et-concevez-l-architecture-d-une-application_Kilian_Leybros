import { Component, signal } from '@angular/core';
import { RequestListComponent } from './components/request-list.component';
import { ChatComponent } from '../../shared/components/chat.component';
import { CustomerRequest } from 'app/shared/interfaces/request.interface';

@Component({
  selector: 'app-request',
  imports: [RequestListComponent, ChatComponent],
  template: `
    <app-request-list [requests]="requests()" class="w-half xs-w-full card" />
    <div class="w-half xs-w-full flex">
      <app-chat [title]="'test'" />
    </div>
  `,
  styles: `:host {
    flex: 1 1 auto;
    display: flex;
    gap:24px;
    padding: 24px;
    @media screen and (max-width: 820px) {
      flex-direction: column;
    }
  }`,
})
export class RequestComponent {
  requests = signal<CustomerRequest[]>([
    {
      id: '1',
      customerName: 'Kilian',
    },
    {
      id: '2',
      customerName: 'Jean',
    },
  ]);
}
