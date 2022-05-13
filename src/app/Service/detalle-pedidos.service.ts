import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallePedidos } from '../Classes/detalle-pedidos';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidosService {

  private detallePedidos: string;
  constructor(private http: HttpClient) {
    this.detallePedidos = 'http://localhost:8080/detallePedidos'
   }

   public findAll(): Observable<DetallePedidos[]>{

    return this.http.get<DetallePedidos[]>(`${this.detallePedidos}/all`);

  }

  public findById(id: number): Observable<DetallePedidos>{

     return this.http.get<DetallePedidos>(`${this.detallePedidos}/getById/${id}`)

  }

  public updateDetallePedidos(detallePedidos: DetallePedidos): Observable<DetallePedidos>{

    return this.http.put<DetallePedidos>(`${this.detallePedidos}/update`, detallePedidos)

  }

  public addDetallePedidos(detallePedidos: DetallePedidos): Observable<DetallePedidos>{

    return this.http.post<DetallePedidos>(`${this.detallePedidos}/add`, detallePedidos)

  }

  public deleteDetallePedidos(id: number): Observable<DetallePedidos>{

    return this.http.delete<DetallePedidos>(`${this.detallePedidos}/delete/${id}`)

  }
}
