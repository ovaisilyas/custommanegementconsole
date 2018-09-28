import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

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
      .pipe(
        map(users => console.log('findStoreAndRole: Success', users),
          catchError(this.handleError<any>('doLogin'))
      )
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


