import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { auth } from '../firebase/config';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  await auth.authStateReady();
  return auth.currentUser ? true : router.createUrlTree(['/login']);
};