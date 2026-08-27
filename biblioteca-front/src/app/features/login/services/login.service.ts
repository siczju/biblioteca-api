import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(cpf: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.apiUrl,
      { cpf },
      { withCredentials: true }
    );
  }
}