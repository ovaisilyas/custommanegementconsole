import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err.status);
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        //this.authenticationService.logout();
        //location.reload(true);
      }
      let error = '';
      if (err.status === 0) {
        error = 'Backend System is down';
        this.authenticationService.logout();
      }
      if (err.error.error !== undefined) {
        error = err.error.error.message || err.statusText;
      } else if (err.error !== undefined) {
        error = err.error.message || err.statusText;
      }
      return throwError(error);
    }));
  }
}
