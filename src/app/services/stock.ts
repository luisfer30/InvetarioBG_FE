import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockItem {
  productoId: number;
  producto: string;
  proveedorId: number;
  proveedor: string;
  precioUnitario: number;
  cantidad: number;
}
export interface StockCreate {
  productoId: number;
  proveedorId: number;
  precioUnitario: number;
  cantidad: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiUrl = 'https://localhost:7213/api/stock';

  constructor(private http: HttpClient) {}

  getStock(): Observable<ApiResponse<StockItem[]>> {
    return this.http.get<ApiResponse<StockItem[]>>(`${this.apiUrl}/list`);
  }
  addStock(stock: StockCreate): Observable<ApiResponse<StockItem>> {
    return this.http.post<ApiResponse<StockItem>>(`${this.apiUrl}/add`, stock);
  }
}
