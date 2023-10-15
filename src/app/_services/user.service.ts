import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getRegularUsers(): Observable<any> {
    return this.http.get(AUTH_API + "/regularUsers", httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(AUTH_API + "/users", httpOptions);
  }
}