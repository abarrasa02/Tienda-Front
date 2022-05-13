import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../Classes/categorias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = 'http://localhost:8080/categorias'
   }
   public findAll(): Observable<Categorias[]>{

    return this.http.get<Categorias[]>(`${this.categoriasUrl}/all`);

  }

  public findById(id: number): Observable<Categorias>{

     return this.http.get<Categorias>(`${this.categoriasUrl}/getById/${id}`)

  }

  public updateCategoria(categoria: Categorias): Observable<Categorias>{

    return this.http.put<Categorias>(`${this.categoriasUrl}/update`, categoria)

  }

  public addCategoria(categoria: Categorias): Observable<Categorias>{

    return this.http.post<Categorias>(`${this.categoriasUrl}/add`, categoria)

  }

  public deleteCategoria(id: number): Observable<Categorias>{

    return this.http.delete<Categorias>(`${this.categoriasUrl}/delete/${id}`)

  }
}
