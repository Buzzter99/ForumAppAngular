import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  let isAuth: boolean = false;
  userService.isAuthenticated().subscribe(data => {
    if (data?.statusCode === 200) {
      isAuth = true;
    } else {
      isAuth = false;
    }
  });
  return isAuth;
};

export const redirectIfLoggedIn: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  let isAuth: boolean = true;
  const router = inject(Router);
  userService.isAuthenticated().subscribe(data => {
    if (data?.statusCode === 200) {
      isAuth = true;
      router.navigate(['home']);
    } else {
      isAuth = false;
    }
  });
  return isAuth;
};
