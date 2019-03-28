import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }



  registerUser(user: Object): Observable<Object> {
    console.log(user);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<Object>("https://thesis-server-icsd14052-54.herokuapp.com/users/register", user, httpOptions)
    .pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    
    return throwError(error.error);

  };
}
