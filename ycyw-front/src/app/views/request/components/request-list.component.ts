import {
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerRequest } from 'app/shared/interfaces';

@Component({
  selector: 'app-request-list',
  imports: [FormsModule],
  template: `
    <h2 class="mb-20">Liste des requêtes clients</h2>
    <input
      [(ngModel)]="filter"
      type="text"
      class="mb-20 w-full"
      placeholder="Rechercher un client"
    />
    <ul class="mb-20">
      @for(request of filteredRequests(); track request.id){ @let active =
      request.id === selectedRequestId();
      <li
        [class.active-item]="active"
        [class.text-primary]="active"
        (click)="selectedRequestId.set(request.id)"
        class="px-12 py-6 my-2 radius"
      >
        <h3 class="flex">
          <span class="flex-auto">{{ request.customerName }}</span>
          <span class="text-sm m-auto">emailatemail.com</span>
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
  selectedRequestId = signal<string | undefined>(undefined);
  requests = input<CustomerRequest[]>();
  filteredRequests = computed(() =>
    this.requests()?.filter(({ customerName }) =>
      customerName.toLowerCase().includes(this.filter().toLowerCase())
    )
  );
}
