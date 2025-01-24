import { Routes } from '@angular/router';
import { ChatComponent } from 'app/shared/components/chat.component';

export const routes: Routes = [
  {
    path: ':id',
    component: ChatComponent,
  },
];
