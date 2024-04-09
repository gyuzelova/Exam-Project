import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree, Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AppService } from '../app.service';


@Injectable({ providedIn: 'root' })
export class AuthActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    if (!this.userService.isLogged) {
      this.router.navigate(['login']);
    }
    return true
  }
};