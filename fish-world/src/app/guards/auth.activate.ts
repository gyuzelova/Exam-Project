import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree, Router, CanActivateFn,
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AppService } from '../app.service';


@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private userService: UserService, api: AppService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
 ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    if (!this.userService.isLogged) {
       return this.router.createUrlTree(['/login']);
    }
    if(this.userService.isLogged){
      return this.router.createUrlTree(['/home']);
    }
    return true;
 }
};