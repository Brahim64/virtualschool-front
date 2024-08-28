import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable } from 'rxjs';
import { loginRequest } from '../shared/LoginRequest';
import { RegisterRequest } from '../shared/RegisterRequest';


const AUTH_API = 'http://localhost:8080/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient) { }
  login(obj:loginRequest): Observable<any> {
    console.log("login")
    return this.http.post<loginRequest>(
      AUTH_API + 'login',
      obj,
      httpOptions
    );
  }
  register(obj:RegisterRequest): Observable<any> {

    return this.http.post(
      AUTH_API + 'register',
      obj,
      httpOptions
    );
  }
}
