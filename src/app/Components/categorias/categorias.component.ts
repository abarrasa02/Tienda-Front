import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/Classes/categorias';
import { CategoriasService } from 'src/app/Service/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categorias[];
  categoria: Categorias;
  categoriaServices: CategoriasService;
  constructor(categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

    public getCategorias(): void {
      this.categoriaServices.findAll().subscribe(
        (response: Categorias[]) => {
          this.categorias = response;
          console.log(this.categorias);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


