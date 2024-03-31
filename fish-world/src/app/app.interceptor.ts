import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, Provider } from '@angular/core';
  import { Observable, catchError } from 'rxjs';
  import { environment } from 'src/environments/environment.development';
  import { ErrorService } from './core/error/error.service';
  import { Router } from '@angular/router';
  
  const { apiUrl } = environment;
  
  @Injectable()
  class AppInterceptor implements HttpInterceptor {
    API = '/api';
  
    constructor(private errorService: ErrorService, private router: Router) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
    

      if (req.url.startsWith(this.API)) {
        req = req.clone({
          url: req.url.replace(this.API, apiUrl),
          withCredentials: true,
        });
      }
   console.log(req);
   
      return next.handle(req).pipe(
        catchError((err) => {
          this.errorService.setError(err);
          
          if (err === 404) {
            this.router.navigate(['/error']);
          }
          return [err];
        })
      );
    }
  }
  
  export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
  };