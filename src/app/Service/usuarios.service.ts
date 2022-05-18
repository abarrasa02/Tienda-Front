import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Classes/productos';
import { Usuarios } from '../Classes/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosUrl: string;
  productoUrl: any;
  constructor(private http: HttpClient) {
    this.usuariosUrl = 'http://localhost:8080/usuarios'
   }

   
   public findAll(): Observable<Usuarios[]>{

    return this.http.get<Usuarios[]>(`${this.usuariosUrl}/all`);

  }

  public findById(id: number): Observable<Usuarios>{

     return this.http.get<Usuarios>(`${this.usuariosUrl}/getById/${id}`)

  }

  public updateUsuarios(usuarios: Usuarios): Observable<Usuarios>{

    return this.http.put<Usuarios>(`${this.usuariosUrl}/update`, usuarios)

  }

  public addUsuarios(usuarios: Usuarios): Observable<Usuarios>{

    return this.http.post<Usuarios>(`${this.usuariosUrl}/add`,usuarios)

  }

  public deleteUsuarios(id: number): Observable<Usuarios>{

    return this.http.delete<Usuarios>(`${this.productoUrl}/delete/${id}`)

  }
}
