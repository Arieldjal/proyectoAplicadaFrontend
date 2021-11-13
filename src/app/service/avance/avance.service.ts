import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/avance/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AvanceService {


  constructor(private http: HttpClient) { }

  getAvances(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }

  addAvance(avance): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(avance), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('agregar avance'))
    );
  }

  getAvanceById(idAvance) {
    return this.http.get(endpoint + 'consultarId/' + idAvance);
  }

  updateAvance(avance): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(avance), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('editar avance'))
    );
  }

  deleteAvance(idAvance): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idAvance).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('eliminar avance'))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
