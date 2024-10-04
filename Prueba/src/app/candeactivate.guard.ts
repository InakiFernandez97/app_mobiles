import { CanActivateFn } from '@angular/router';

export const candeactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
