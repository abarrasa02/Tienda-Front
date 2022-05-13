import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Classes/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productoUrl: string;
  constructor(private http: HttpClient) {
    this.productoUrl = 'http://localhost:8080/productos'
   }

   public findAll(): Observable<Productos[]>{

    return this.http.get<Productos[]>(`${this.productoUrl}/all`);

  }

  public findById(id: number): Observable<Productos>{

     return this.http.get<Productos>(`${this.productoUrl}/getById/${id}`)

  }

  public updateProductos(productos: Productos): Observable<Productos>{

    return this.http.put<Productos>(`${this.productoUrl}/update`, productos)

  }

  public addProductos(productos: Productos): Observable<Productos>{

    return this.http.post<Productos>(`${this.productoUrl}/add`, productos)

  }

  public deleteProductos(id: number): Observable<Productos>{

    return this.http.delete<Productos>(`${this.productoUrl}/delete/${id}`)

  }
}
