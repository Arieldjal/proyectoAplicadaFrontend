import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/solicitud/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  getSolicitudes(): Observable<any> {
    return this.http.get(endpoint + 'consultar');
  }

  addSolicitud(solicitud): Observable<any> {
    return this.http.post(endpoint, JSON.stringify(solicitud), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('agregar solicitud'))
    );
  }

  getSolicitudById(idSolicitud) {
    return this.http.get(endpoint + 'consultarId/' + idSolicitud);
  }

  updateSolicitud(solicitud): Observable<any> {
    return this.http.put(endpoint + 'editar', JSON.stringify(solicitud), httpOptions).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('editar solicitud'))
    );
  }

  deleteSolicitud(idSolicitud, idFuncionario): Observable<any> {
    return this.http.delete(endpoint + 'eliminar/' + idSolicitud + '/' + idFuncionario).pipe(
      tap(res => {
        return res;
      }),
      catchError(this.handleError<any>('eliminar solicitud'))
    );
  }

  getMainSolicitudesData(): Observable<any> {
    return this.http.get(endpoint + 'consultaSimple');
  }

  getSolicitudesIds(): Observable<any> {
    return this.http.get(endpoint + 'consultaSolicitudesIds');
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
