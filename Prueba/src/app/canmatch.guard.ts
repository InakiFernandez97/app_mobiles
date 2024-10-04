import { CanActivateFn } from '@angular/router';

export const canmatchGuard: CanActivateFn = (route, state) => {
  return true;
};
