import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Career } from '../models/career.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
       "Content-Type": "application/json"
    });
  }

  addCareer(estudiante: Career): Promise<Career> {
    let body = JSON.stringify(estudiante);
    return this.http.post<Career>('https://localhost:7299/api/Careers', body, {
          headers: this.generateBasicHeaders()
        }).toPromise()
    .then()
    .catch();
  }

  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>('https://localhost:7299/api/Careers');
  }

  deleteCareer(id: string): Promise<Career> {
    return this.http.delete<Career>('https://localhost:7299/api/Careers/' + id).toPromise()
    .then()
    .catch();
  }

  getCareer(id: string): Observable<Career> {
    return this.http.get<Career>('https://localhost:7299/api/Careers/' + id);
  }

  updateCareer(id: string, data:Career): Observable<Career> {
    console.log(id, data);
    let body = JSON.stringify(data);
    return this.http.put<Career>('https://localhost:7299/api/Careers/' + id, body, {
          headers: this.generateBasicHeaders()
        });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
