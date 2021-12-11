import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/sexo/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(private http: HttpClient) { }

  getSexos(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }

  addSexo(sexo): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(sexo), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('agregar sexo'))
    );
  }

  getSexoById(idSexo) {
    return this.http.get(endpoint + 'consultarId/' + idSexo);
  }

  updateSexo(sexo): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(sexo), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('editar sexo'))
    );
  }

  deleteSexo(idSexo): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idSexo).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('eliminar sexo'))
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
