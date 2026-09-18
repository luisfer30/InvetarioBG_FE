import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Provider {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  correo: string;
  razonSocial: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private apiUrl = 'https://localhost:7213/api/providers';

  constructor(private http: HttpClient) {}

  getProviders(): Observable<ApiResponse<Provider[]>> {
    return this.http.get<ApiResponse<Provider[]>>(`${this.apiUrl}/list`);
  }
}
