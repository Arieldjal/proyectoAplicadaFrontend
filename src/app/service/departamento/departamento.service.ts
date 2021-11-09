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
}
