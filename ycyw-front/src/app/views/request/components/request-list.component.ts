import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupportRequest } from 'app/core/interfaces';

@Component({
  selector: 'app-request-list',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  template: `
    <h2 class="mb-20">Liste des requêtes clients</h2>
    <input
      [(ngModel)]="filter"
      type="text"
      class="mb-20 w-full"
      placeholder="Rechercher un client"
    />
    <ul class="mb-20">
      @for(request of filteredRequests(); track request.id){
      <li
        routerLinkActive="active-item text-primary"
        [routerLink]="request.id"
        class="px-12 py-6 my-2 radius"
      >
        <h3 class="flex">
          <span class="flex-auto">{{ request.addresseeName }}</span>
          <span class="text-sm m-auto">{{ request.addresseeEmail }}</span>
        </h3>
      </li>
      }
    </ul>
  `,
  styles: `li:hover { cursor:pointer; background-color: var(--light); transition: all 0.2s } `,
})
export class RequestListComponent {
  search = viewChild<ElementRef<HTMLInputElement>>('search');
  filter = signal('');
  //selectedRequestId = signal<string | undefined>(undefined);
  requests = input<SupportRequest[]>();
  filteredRequests = computed(() => {
    if (this.requests()) {
      return this.requests()?.filter(({ addresseeName }) =>
        addresseeName.toLowerCase().includes(this.filter().toLowerCase())
      );
    }
    return [];
  });
}
