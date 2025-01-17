import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'app/shared/interfaces';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  template: `
    <div class="text-bold p-12">{{ title() }}</div>
    <ul #chatHistory class="flex-auto flex flex-col  gap-12 p-12 text-sm">
      @for(message of messages(); track $index){ @if(currentUserId() ===
      message.senderId){
      <li class="flex justify-content-end text-semibold">
        <div class="p-12 bg-primary">{{ message.content }}</div>
      </li>
      }@else {
      <li class="flex text-semibold">
        <div class="p-12 bg-gray-300">{{ message.content }}</div>
      </li>
      } }
    </ul>
    <div class="flex">
      <input
        [(ngModel)]="newMessage"
        class="flex flex-auto px-12 py-18"
        type="text"
        placeholder="Avez-vous une question ?"
      />
      <button (click)="submit($event)" class="btn text-primary text-md">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  `,
  host: { class: 'card no-padding flex flex-col flex-auto' },
  styles: `
   ul{
      border-top: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
      overflow: auto;
      li{
        div{
          max-width: 75%;
          width: fit-content;
          border-radius: 12px;
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
  title = input.required();
  pendingScroll = signal(false);
  currentUserId = signal('1');
  newMessage = signal('');
  messages = signal<Message[]>([
    {
      senderId: '1',
      content: 'Un message',
    },
    {
      senderId: '2',
      content: 'Réponse',
    },
    {
      senderId: '1',
      content: 'Un message',
    },
  ]);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    if (this.pendingScroll()) {
      this.scrollToBottom();
      this.pendingScroll.set(false);
    }
  }

  submit(event: Event) {
    this.messages.update((oldMessage: Message[]) => {
      const newValue = [
        ...oldMessage,
        { senderId: '1', content: this.newMessage() },
      ];
      return newValue;
    });
    this.newMessage.set('');

    this.pendingScroll.set(true);
    this.cdr.detectChanges();
  }

  scrollToBottom() {
    this.chatHistory()!.nativeElement.scrollTop =
      this.chatHistory()!.nativeElement!.scrollHeight;
  }
}
