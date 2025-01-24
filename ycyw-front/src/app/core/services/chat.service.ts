import { computed, effect, inject, Injectable } from '@angular/core';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { SupportRequestService } from './support-request.service';
import { Message } from '../interfaces';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private client: CompatClient | undefined = undefined;
  private subscription: StompSubscription | undefined;
  readonly messageService = inject(MessageService);
  readonly requestService = inject(SupportRequestService);

  selectedRequestId = computed(() => this.requestService.selectedRequestId());

  constructor() {
    this.client = Stomp.client('ws://localhost/ws');
    this.client.reconnect_delay = 5000;
    effect((onCleanup) => {
      const requestId = this.selectedRequestId();
      if (!!requestId) {
        this.connect(requestId);
      }
      onCleanup(() => {
        this.disconnect();
      });
    });
  }

  connect(requestId: string | null): void {
    if (this.client) {
      this.client.connect({}, () => {
        this.subscription = this.client!.subscribe(
          `/channel/${requestId}/messages`,
          (response) => {
            const message = JSON.parse(response.body) as Message;
            this.messageService.messagesResource.update((chat) => {
              return chat
                ? {
                    ...chat,
                    messages: !!chat?.messages
                      ? [...chat.messages, message]
                      : [message],
                  }
                : {
                    messages: [message],
                  };
            });
          }
        );
      });
    }
  }

  disconnect() {
    if (this.client?.connected) {
      this.client.disconnect();
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  sendMessage(requestId: string | null, content: string): boolean {
    let messageSent = false;
    try {
      if (this.client && this.client.connected) {
        const message = { content };
        this.client.send(
          `/server/sendMessage/${requestId}`,
          {},
          JSON.stringify(message)
        );
        messageSent = true;
      } else {
        console.warn(
          "Impossible d'envoyer un message : WebSocket non connecté."
        );
      }
    } catch (e) {
      console.log("Erreur lors de l'envoie du message");
    }
    return messageSent;
  }
}
