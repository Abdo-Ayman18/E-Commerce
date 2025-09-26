import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  // check token
  if (cookieService.get('token')) {
    return true;
  } else {
    //  navigate to login

    //   router.navigate(['/login']);

    //   return false;
    return router.parseUrl('/login');
  }
};
