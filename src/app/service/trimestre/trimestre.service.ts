import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/trimestre/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TrimestreService {

  constructor(private http: HttpClient) { }

  getTrimestres(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }
  
  addTrimestre(trimestre): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(trimestre), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('agregar trimestre'))
    );
  }

  getTrimestreById(idTrimestre) {
    return this.http.get(endpoint + 'consultarId/' + idTrimestre);
  }

  updateTrimestre(trimestre): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(trimestre), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('editar trimestre'))
    );
  }

  deleteTrimestre(idTrimestre): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idTrimestre).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('eliminar trimestre'))
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
