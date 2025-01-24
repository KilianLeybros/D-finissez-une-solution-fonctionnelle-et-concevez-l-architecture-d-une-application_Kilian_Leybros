import { Component, computed, inject, signal } from '@angular/core';
import { RequestListComponent } from './components/request-list.component';
import { ChatComponent } from '../../shared/components/chat.component';

import { RouterOutlet } from '@angular/router';
import { SupportRequest } from 'app/core/interfaces';
import { SupportRequestService } from 'app/core/services/support-request.service';

@Component({
  selector: 'app-request',
  imports: [RequestListComponent, RouterOutlet],
  template: `
    <app-request-list
      [requests]="requestsList()"
      class="request-max-h w-half xs-w-full card"
    />
    <div class="request-max-h w-half xs-w-full flex">
      <router-outlet />
    </div>
  `,
  styles: `:host {
    justify-content: center;
    flex: 1 1 auto;
    display: flex;
    gap:24px;
    padding: 24px;
    @media screen and (max-width: 820px) {
      flex-direction: column;
    }
  }

  .request-max-h{
    max-height: 802px;
  }`,
})
export class RequestComponent {
  readonly supportRequestService = inject(SupportRequestService);
  requestsList = computed(
    () => this.supportRequestService.supportRequestsResource.value() || []
  );
}
