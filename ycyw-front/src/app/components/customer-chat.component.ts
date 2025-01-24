import { Component, signal } from '@angular/core';
import { ChatComponent } from '../shared/components/chat.component';

@Component({
  selector: 'app-customer-chat',
  imports: [ChatComponent],
  template: `
    @if(isChatOpen()){
    <div
      style="position: absolute;
    bottom: 75px;
    right: 0px;"
    >
      <div class="flex flex-auto" style="width: 300px; height: 400px">
        <app-chat [title]="'Service client'" />
      </div>
    </div>
    }
    <button
      (click)="isChatOpen.set(!isChatOpen())"
      class="btn btn-secondary rounded text-lg"
    >
      @if(isChatOpen()){
      <i class="fa-solid fa-xmark"></i>
      }@else{
      <i class="fa-regular fa-comments"></i>
      }
    </button>
  `,
  styles: `
    :host {
      position: absolute;
      bottom: 60px;
      right: 35px;
    }
   
    button{
      height: 60px;
      width:60px;
    }
  `,
})
export class CustomerChatComponent {
  isChatOpen = signal(false);
}
