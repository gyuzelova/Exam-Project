import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ErrorService } from '../core/error/error.service';


export function guestActive(): CanActivateFn {
  return () => {

    const userService = inject(UserService);
    const router = inject(Router);
    const message = inject(ErrorService)

    if (userService.isLogged) {
      message.setError('You are already logged in. First logout!')
      return router.createUrlTree(['/']);
    }
    return true;
  };
}