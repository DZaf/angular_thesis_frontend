import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://thesis-server-icsd14052-54.herokuapp.com/users/');
  }

  gitsearch(repo: String, language: String) {
    if (language == '') {
      return this.http.get('https://thesis-server-icsd14052-54.herokuapp.com/github/' + repo + '/');
    } else {
      return this.http.get('https://thesis-server-icsd14052-54.herokuapp.com/github/' + repo + '/' + language);
    }
  }

  OpenDir(path:String,owner:String,repo:String)
  {
    return this.http.get(`https://thesis-server-icsd14052-54.herokuapp.com/github/content/dir/${owner}/${repo}?path=${path}`).pipe(catchError(this.handleError));
  }


  apiSearch(email: any, tags: Array<String>, adv_search_data: Object) {
    var query = "";
    for (let i = 0; i < tags[0].length; i++) {
      if (query == "") {
        query = "?tags=" + tags[0][i]
      }else{
        query = query + "&tags=" + tags[0][i];
      }
      

    }

    Object.entries(adv_search_data).forEach(

      ([key]) => {
        if (adv_search_data[key] != "") {
          query=query+"&"+key+"="+adv_search_data[key]
        }
      }//console.log(key, value.value)
    );

    //console.log(query);
    
    console.log(`https://thesis-server-icsd14052-54.herokuapp.com/search/${email}/${query}`);
    return this.http.get(`https://thesis-server-icsd14052-54.herokuapp.com/search/${email}/${query}`).pipe(catchError(this.handleError));
  }


  Login(user: Object): Observable<Object> {
    console.log(user);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<Object>("https://thesis-server-icsd14052-54.herokuapp.com/users/login", user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  Verify(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let token = { "token": localStorage.getItem('token') }

    return this.http.post<Object>("https://thesis-server-icsd14052-54.herokuapp.com/users/verify", token, httpOptions)
      .pipe(catchError(this.handleError));
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

  loggedIn() {
    return !!localStorage.getItem('token');
  }



  private handleError(error: HttpErrorResponse) {

    return throwError(error.error);

  };
}
