import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Productos } from 'src/app/Classes/productos';
import { ProductosService } from 'src/app/Service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Productos[];
  updateProductos:Productos;
  deleteProductos:Productos;
  constructor(private productosService:ProductosService) { }

  ngOnInit(): void {
    this.getProductos()
  }
  public precioRebajado(precio: number, rebaja: number){
  const precioFinal = precio - precio*(rebaja/100)
  return precioFinal.toFixed(2);
  }

  public getProductos(): void {
    this.productosService.findAll().subscribe(
      (response: Productos[]) => {
        this.productos = response;
        console.log(this.productos);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public AddProductos(addForm: NgForm): void {
    document.getElementById('add-Productos-form')?.click();
    this.productosService.addProductos(addForm.value).subscribe(
      (response: Productos) => {
        console.log(response);
        this.getProductos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProductos(productos: Productos): void {
    console.log('Productosedit', productos);
    
     this.productosService.updateProductos(productos).subscribe(
       (response: Productos) => {
       console.log(response);
       this.getProductos();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteProductos(productosId: number): void {
    this.productosService.deleteProductos(productosId).subscribe(
      (response: Productos) => {
        console.log(response);
        this.getProductos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(productos: Productos, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductosModal');
    }
    if (mode === 'edit') {
      this.updateProductos = productos;
      button.setAttribute('data-target', '#updateProductosModal');
    }
    if (mode === 'delete') {
      this.deleteProductos = productos;
      button.setAttribute('data-target', '#deleteProductosModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
