import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/funcionario/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {


  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }

  addFuncionario(funcionario): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(funcionario), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('add funcionario'))
    );
  }

  getFuncionarioById(idFuncionario) {
    return this.http.get(endpoint + 'consultarId/' + idFuncionario);
  }

  updateFuncionario(funcionario): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(funcionario), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('update funcionario'))
    );
  }

  deleteFuncionario(idFuncionario): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idFuncionario).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('delete funcionario'))
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
