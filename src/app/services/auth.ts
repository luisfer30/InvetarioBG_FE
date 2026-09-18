import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7213/api/security';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = {
      correo,
      password,
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth`, request).pipe(
      tap((response: LoginResponse) => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
