import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from '../Classes/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidosUrl: string;
  constructor(private http: HttpClient) {
    this.pedidosUrl = 'http://localhost:8080/pedidos'
   }

   public findAll(): Observable<Pedidos[]>{

    return this.http.get<Pedidos[]>(`${this.pedidosUrl}/all`);

  }

  public findById(id: number): Observable<Pedidos>{

     return this.http.get<Pedidos>(`${this.pedidosUrl}/getById/${id}`)

  }

  public updatePedidos(pedidos: Pedidos): Observable<Pedidos>{

    return this.http.put<Pedidos>(`${this.pedidosUrl}/update`, pedidos)

  }

  public addPedidos(pedidos: Pedidos): Observable<Pedidos>{

    return this.http.post<Pedidos>(`${this.pedidosUrl}/add`,pedidos)

  }

  public deletePedidos(id: number): Observable<Pedidos>{

    return this.http.delete<Pedidos>(`${this.pedidosUrl}/delete/${id}`)

  }

}
