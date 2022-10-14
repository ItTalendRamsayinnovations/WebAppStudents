import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
       "Content-Type": "application/json"
    });
  }

  addStudent(estudiante: Student): Promise<Student> {
    let body = JSON.stringify(estudiante);
    return this.http.post<Student>('https://localhost:7299/api/Students', body, {
          headers: this.generateBasicHeaders()
        }).toPromise()
    .then()
    .catch();
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('https://localhost:7299/api/Students');
  }

  deleteStudent(id: string): Promise<Student> {
    return this.http.delete<Student>('https://localhost:7299/api/Students/' + id).toPromise()
    .then()
    .catch();
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>('https://localhost:7299/api/Students/' + id);
  }

  updateStudent(id: string, data:Student): Observable<Student> {
    let body = JSON.stringify(data);
    return this.http.put<Student>('https://localhost:7299/api/Students/' + id.toString(), body, {
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



