import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { 
    if (this.tokenService.getToken() && this.tokenService.getUser()) {
      this.isLoggedIn = true;
    }
  } 

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/login', {
      email,
      password
    }, httpOptions);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'api/registration', {
      firstName,
      lastName,
      email,
      password
    }, httpOptions);
  }

  isAdmin(): boolean {
    return this.tokenService.getUser().role == "ROLE_ADMIN";
  }

  isProfessor(): Observable<any> {
    return this.http.get(AUTH_API + "api/isProfessor/" + this.tokenService.getUser().email, httpOptions);
  }

  getAdmins(): Observable<any> {
    return this.http.get(AUTH_API + "api/admin", httpOptions)
  }

  demoteAdmin(email: string): Observable<any> {
    console.log("demote " + email)
    return this.http.put(AUTH_API + "api/removeAdmin", email, httpOptions)
  }

  promoteToAdmin(email: string): Observable<any> {
    console.log("promote " + email)
    return this.http.put(AUTH_API + "api/promoteToAdmin", email, httpOptions)
  }
}