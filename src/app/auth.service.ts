import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

interface AuthResponse {
  token: string;
}

interface User {
  sub: string;
  name: string;
}


@Injectable()
export class AuthService {

  _user: User;
  token;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("user");
    if (token) {
      this._user = jwt_decode(token);
      this.token = token;
    }
  }

  get user() {
    return this._user;
  }

  get authenticated() {
    return this._user !== undefined;
  }

  handleError(error: HttpErrorResponse) {
    return Observable.throw({
      error: error.error
    });
  }

  login(user) {
    const lol = this.http.post("/login", user)
    lol.subscribe((response: any) => {
      const decoded = jwt_decode(response.token);
      localStorage.setItem("user", response.token);
      this._user = decoded
      this.token = response.token;
    }, (error) => {
      console.error("could not login");
    });

    return lol;
  }

  logout() {
    this._user = undefined;
    this.token = null;
    localStorage.removeItem("user");
  }

  getResource(friends): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    }
    return this.http.get<any>(friends, options)
  }
}
