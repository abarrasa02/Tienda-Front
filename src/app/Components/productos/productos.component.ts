import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Productos } from 'src/app/Classes/productos';
import { ProductosService } from 'src/app/Service/productos.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { Categorias } from 'src/app/Classes/categorias';
import { CategoriasService } from 'src/app/Service/categorias.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Productos[];
  updateProductos:Productos;
  deleteProductos:Productos;
  producto: Productos;
  categorias: Categorias[];
  categoria: Categorias;

  page = 1;
  count = 0;
  pageSize = 7;
  pageSizes = [3, 6, 9];
  constructor(private productosService:ProductosService,private spinner: NgxSpinnerService, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.getProductos();
    this.spinner.show();
    this.getCategorias();
    setTimeout(() => {
     
      this.spinner.hide();
  }, 1000);


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
  public abrir(productos: Productos | null, mode: string){
    if(mode == 'eliminar'){
      document.getElementById('id02').style.display = 'block';
      this.deleteProductos = productos;
    }
    if(mode == 'add'){
      document.getElementById('id01').style.display = 'block';
    }
    if(mode == 'update'){
      document.getElementById('id03').style.display = 'block';
      this.updateProductos = productos;
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
download(){
  this.productosService.downloadFile().subscribe((response) => {
     let blob = new Blob([response],{type: '*/*;charset=utf-8'});
     FileSaver.saveAs(blob,'productos.xls');
    },
  (error: any) => console.log('Error downloading the file'),)



}
}
