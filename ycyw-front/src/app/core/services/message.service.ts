import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { Chat, Message, SupportRequest } from '../interfaces';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { SupportRequestService } from './support-request.service';

const API_REQUEST = '/api/support-request';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly authService = inject(AuthService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly supportRequestService = inject(SupportRequestService);

  selectedRequestId = computed(() =>
    this.supportRequestService.selectedRequestId()
  );

  messagesResource = resource({
    request: this.selectedRequestId,
    loader: () => this.fetchMessages(),
  });

  async fetchMessages(): Promise<Chat | undefined> {
    if (!!this.selectedRequestId()) {
      return (
        await fetch(`${API_REQUEST}/${this.selectedRequestId()}/messages`)
      ).json();
    }
    return;
  }
}
