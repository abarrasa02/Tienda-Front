import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categorias } from 'src/app/Classes/categorias';
import { CategoriasService } from 'src/app/Service/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  
})

export class CategoriasComponent implements OnInit {
  categorias: Categorias[];
  updatecategoria:Categorias;
  deletecategoria:Categorias;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];
  constructor( private categoriasService: CategoriasService, private router: Router) { }

  ngOnInit(): void {
    this.getCategorias();

    }


  

    public getCategorias(): void {
      this.categoriasService.findAll().subscribe(
        (response: Categorias[]) => {
          this.categorias = response;
          console.log(this.categorias);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public AddCategoria(addForm: NgForm): void {
      document.getElementById('add-categoria-form')?.click();
      this.categoriasService.addCategoria(addForm.value).subscribe(
        (response: Categorias) => {
          console.log(response);
          this.getCategorias();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }

    public onUpdateCategoria(): void {
       this.categoriasService.updateCategoria(this.updatecategoria).subscribe(
         (response: Categorias) => {
         console.log(response);
         this.getCategorias();
        },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
    }
    public onDeleteCategoria(categoriaid: number): void {
      this.categoriasService.deleteCategoria(categoriaid).subscribe(
        (response: Categorias) => {
          console.log(response);
          this.getCategorias();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public onOpenModal(categoria: Categorias, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addCategoriaModal');
      }
      if (mode === 'edit') {
        this.updatecategoria = categoria;
        button.setAttribute('data-target', '#updateCategoriaModal');
      }
      if (mode === 'delete') {
        this.deletecategoria = categoria;
        button.setAttribute('data-target', '#deleteCategoriaModal');
      }
      container!.appendChild(button);
      button.click();
    }
    public abrir(categoria: Categorias | null, mode: string){
      if(mode == 'eliminar'){
        document.getElementById('id02').style.display = 'block';
        this.deletecategoria = categoria;
      }
      if(mode == 'add'){
        document.getElementById('id01').style.display = 'block';
      }
      if(mode == 'update'){
        document.getElementById('id03').style.display = 'block';
        this.updatecategoria = categoria;
      }
    }
    public cerrar(mode: string){
      if(mode == 'eliminar'){
      document.getElementById('id02').style.display = 'none';
    }
    if(mode == 'add'){
      document.getElementById('id01').style.display = 'none';
    }
    if(mode == 'update'){
      document.getElementById('id03').style.display = 'none';
    }
  }
}



