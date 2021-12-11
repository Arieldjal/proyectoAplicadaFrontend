import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/reportes/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  getSolicitudesRangoFechas(rangos): Observable<any> {
    return this.http.post(endpoint + 'getSolicitudesRangoFechas', JSON.stringify(rangos), httpOptions);
  }

  getBitacoraRangoMeses(rangos): Observable<any> {
    return this.http.post(endpoint + 'getBitacoraRangoMeses', JSON.stringify(rangos), httpOptions);
  }

  getAvancesProyectos(): Observable<any> {
    return this.http.get(endpoint + 'getAvancesProyectos');
  }

  getProyectosPendientesTerminados(): Observable<any> {
    return this.http.get(endpoint + 'getProyectosPendientesTerminados');
  }

  getProyectosCambiosSolicitados(): Observable<any> {
    return this.http.get(endpoint + 'getProyectosCambiosSolicitados');
  }

  getHistoricoAvances(toSearch): Observable<any> {
    return this.http.post(endpoint + 'getHistoricoAvances', JSON.stringify(toSearch), httpOptions);
  }


}
