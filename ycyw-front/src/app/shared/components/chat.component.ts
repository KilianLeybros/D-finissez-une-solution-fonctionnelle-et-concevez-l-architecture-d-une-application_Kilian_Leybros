import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat, Message } from 'app/core/interfaces';
import { SupportRequestService } from '../../core/services/support-request.service';
import { ChatService } from '../../core/services/chat.service';
import { MessageService } from '../../core/services/message.service';
import { style } from '@angular/animations';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  template: `
    @let c = chat();
    <div class="text-bold p-12">{{ c.addresseeName }}</div>
    <ul #chatHistory class="flex-auto flex flex-col  gap-12 p-12 text-sm">
      @for(message of c.messages; track message.id){ @if(message.sender ==
      authService.currentUser()?.id){
      <li class="flex justify-content-end text-semibold">
        <p class="p-12 bg-primary">{{ message.content }}</p>
      </li>
      }@else {
      <li class="flex text-semibold">
        <p class="p-12 bg-gray-300">{{ message.content }}</p>
      </li>
      } }
    </ul>
    <div class="flex">
      <input
        maxlength="255"
        (keydown)="detectSubmit($event)"
        [(ngModel)]="newMessage"
        class="flex flex-auto px-12 py-18"
        type="text"
        placeholder="Avez-vous une question ?"
      />
      <button (click)="submit()" class="btn text-primary text-md">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  `,
  host: {
    class: 'card no-padding flex flex-col flex-auto',
  },
  styles: `
  :host{
    width: inherit;
  }
   ul{
      border-top: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
      overflow: auto;
      overflow-wrap: break-word;
      li{

        p{
          max-width: 50%;
          border-radius: 12px;
          margin: 0;
        }
      }
    }

    input {
      outline: none;
      border: none;
      border-bottom-left-radius: 16px;
    }

    button{
      background-color: inherit;
      color: var(--primary);
    }

    button:hover{
      color: var(--darker);
    }
  `,
})
export class ChatComponent {
  chatHistory = viewChild<ElementRef<HTMLUListElement>>('chatHistory');

  readonly supportRequestService = inject(SupportRequestService);
  readonly chatService = inject(ChatService);
  readonly messageService = inject(MessageService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly authService = inject(AuthService);

  customerRequest = input<string>();
  routeRequest = toSignal(this.activatedRoute.params, { initialValue: null });

  chat = computed(
    () => this.messageService.messagesResource.value() || ({} as Chat)
  );

  pendingScroll = signal(false);
  isFirstRender = signal(true);

  newMessage = signal('');

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      const requestId = !!this.routeRequest()?.['id']
        ? this.routeRequest()?.['id']
        : this.customerRequest();
      this.supportRequestService.selectRequestId(requestId);
    });

    effect(() => {
      if (this.chat().messages && this.chat().messages!.length > 0) {
        this.pendingScroll.set(true);
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewChecked() {
    if (this.pendingScroll()) {
      this.scrollToBottom();
      this.pendingScroll.set(false);
    }
  }

  submit() {
    const messageSent = this.chatService.sendMessage(
      this.supportRequestService.selectedRequestId(),
      this.newMessage()
    );
    if (messageSent) {
      this.newMessage.set('');
    }
  }

  detectSubmit(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      this.submit();
    }
  }

  scrollToBottom() {
    this.chatHistory()!.nativeElement.scrollTop =
      this.chatHistory()!.nativeElement!.scrollHeight;
  }
}
