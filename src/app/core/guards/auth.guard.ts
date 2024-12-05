import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.isAuthenticated().pipe(
    map((data) => {
      if (data?.statusCode === 200) {
        return true;
      } else {
        router.navigate(['login']); 
        return false; 
      }
    })
  );
};
export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.isAuthenticated().pipe(
    map((data) => {
      if (data?.statusCode === 200) {
        router.navigate(['home']); 
        return false;
      } else {
        return true;
      }
    })
  );
};
