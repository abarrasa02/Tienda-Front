import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categorias } from 'src/app/Classes/categorias';
import { CategoriasService } from 'src/app/Service/categorias.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
  
})
export class CategoriasComponent implements OnInit {
  categorias: Categorias[];
  updatecategoria:Categorias;
  deletecategoria:Categorias;

  constructor( private categoriasService: CategoriasService) { }

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

    public onUpdateCategoria(categoria: Categorias): void {
      console.log('categoriaedit', categoria);
      
       this.categoriasService.updateCategoria(categoria).subscribe(
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
    public abrir(categoria: Categorias | null){
      if(categoria){
        document.getElementById('id02').style.display = 'block';
        this.deletecategoria = categoria;
      }else{
        document.getElementById('id02').style.display = 'block';
      }
    }
  }


