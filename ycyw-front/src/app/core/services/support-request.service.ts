import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { Message, SupportRequest } from '../interfaces';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../enums/role.enum';

const API_REQUEST = '/api/support-request';

@Injectable({
  providedIn: 'root',
})
export class SupportRequestService {
  readonly authService = inject(AuthService);
  readonly activatedRoute = inject(ActivatedRoute);

  supportRequestsResource = resource({
    loader: () => this.fetchSupportRequest(),
  });

  selectedRequestId = signal<string | null>(null);

  async fetchSupportRequest(): Promise<SupportRequest[]> {
    return (await fetch(`${API_REQUEST}`)).json();
  }

  selectRequestId(id: string) {
    const user = this.authService.currentUser();
    this.selectedRequestId.update(() => {
      if (user?.role === Role.ADMIN && id) {
        return id;
      } else {
        return user?.supportRequestId || null;
      }
    });
  }
}
