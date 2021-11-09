import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  userLogin(userData): Observable<any> {
    return this.http.post<any>(endpoint + '/login', JSON.stringify(userData), httpOptions).pipe(
      map((user) => {
        if (user.userExists) {
          sessionStorage.setItem("currentUser", JSON.stringify(user.data));
        }

        return user.userExists;
      }
        ), catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T> (operation = "operation", result?: T){
    return (error:any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
