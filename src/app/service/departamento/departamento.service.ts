import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/departamento/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }

  addDepartamento(departamento): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(departamento), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('agregar departamento'))
    );
  }

  getDepartamentoById(idDepartamento) {
    return this.http.get(endpoint + 'consultarId/' + idDepartamento);
  }

  updateDepartamento(departamento): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(departamento), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('editar departamento'))
    );
  }

  deleteDepartamento(idDepartamento): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idDepartamento).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('eliminar departamento'))
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
