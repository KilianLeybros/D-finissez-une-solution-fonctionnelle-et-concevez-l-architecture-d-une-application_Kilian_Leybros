import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isAdmin = authService.currentUserRole() === Role.ADMIN;
  if (!isAdmin) {
    const isLoggedin = !!(await authService.fetchCurrentUser());
    if (isLoggedin) {
      isAdmin = authService.currentUserRole() === Role.ADMIN;
    }
  }
  return isAdmin;
};
