import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../Classes/categorias';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl: string;
  private display: BehaviorSubject<'open' | 'close'> = 
  new BehaviorSubject('close');
  
  constructor(private http: HttpClient) {
    this.categoriasUrl = 'http://localhost:8080/categoria'
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
  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }
}
