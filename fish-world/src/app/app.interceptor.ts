import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  API = '/api';

  constructor(private errorService: ErrorService,
    private router: Router,
    private injector: Injector) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    let userService = this.injector.get(UserService);

    if (request.url.startsWith(this.API)) {
        request = request.clone({
        url: request.url.replace(this.API, apiUrl),
        withCredentials: true,
        setHeaders: {
          Authorization: `${userService.getToken()}`  
      }
    })

    }
    console.log(request);

    return next.handle(request)
    .pipe(
      catchError((err) => {
        console.log(err);

        if (err.status === 401) {
          console.log(401);
          this.errorService.setError(err);
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          console.log(403);
          this.errorService.setError(err);
          this.router.navigate(['/']);
        } else if (err.status === 409) {
          console.log(409);
          this.errorService.setError(err);
        } else {
          this.errorService.setError(err);
          this.router.navigate(['404']);
        }
        return [err];
      })
    )
  }
}