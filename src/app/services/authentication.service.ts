import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true', 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient) { }

  doLogin(username: string, password: string) {
    console.log('in login function');
    return this.http.post<any>(`${environment.apiUrl}/wcs/resources/cmclogin/doLogin`,
      { logonId: username, logonPassword: password }, httpOptions)
      .pipe(map(
        (users) => {
          const userDetails = users['Login Details'];
          console.log('in pipe' , userDetails);
          return userDetails;
        }
        ),
        catchError(this.handleError));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('storeId');
    localStorage.removeItem('userId');
    localStorage.removeItem('WCToken');
    localStorage.removeItem('WCTrustedToken');
    localStorage.removeItem('personalizationID');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error['error']);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}


