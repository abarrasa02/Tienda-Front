import { Component } from '@angular/core';
import { Categorias } from './Classes/categorias';
import { Router } from '@angular/router';
import { CategoriasService } from './Service/categorias.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TiendaPC';
  categoria: Categorias[];

  constructor(private router: Router, private categoriaService: CategoriasService){}
    
}
