import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isloggedGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  // check token
  if (cookieService.get('token')) {
    //  navigate to home
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
