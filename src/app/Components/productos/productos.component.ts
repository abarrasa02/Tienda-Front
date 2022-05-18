import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/Classes/productos';
import { ProductosService } from 'src/app/Service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Productos[];
  constructor(private productosService:ProductosService) { }

  ngOnInit(): void {
    this.getProductos();
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
}
