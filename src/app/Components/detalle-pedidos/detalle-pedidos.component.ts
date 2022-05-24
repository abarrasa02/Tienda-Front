import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DetallePedidos } from 'src/app/Classes/detalle-pedidos';
import { DetallePedidosService } from 'src/app/Service/detalle-pedidos.service';

@Component({
  selector: 'app-detalle-pedidos',
  templateUrl: './detalle-pedidos.component.html',
  styleUrls: ['./detalle-pedidos.component.css']
})
export class DetallePedidosComponent implements OnInit {
  detallePedidos: DetallePedidos[];
  updateDetallePedidos:DetallePedidos;
  deleteDetallePedidos:DetallePedidos;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];
  constructor(private detallePedidosService: DetallePedidosService) { }

  ngOnInit(): void {
    this.getDetallePedidos();
  }
  public getDetallePedidos(): void {
    this.detallePedidosService.findAll().subscribe(
      (response: DetallePedidos[]) => {
        this.detallePedidos = response;
        console.log(this.detallePedidos);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public AddDetallePedidos(addForm: NgForm): void {
    document.getElementById('add-detallePedidos-form')?.click();
    this.detallePedidosService.addDetallePedidos(addForm.value).subscribe(
      (response: DetallePedidos) => {
        console.log(response);
        this.getDetallePedidos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDetallePedidos(detallePedidos: DetallePedidos): void {
    console.log('detallePedidosedit', detallePedidos);
    
     this.detallePedidosService.updateDetallePedidos(detallePedidos).subscribe(
       (response: DetallePedidos) => {
       console.log(response);
       this.getDetallePedidos();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteDetallePedidos(id: number): void {
    this.detallePedidosService.deleteDetallePedidos(id).subscribe(
      (response: DetallePedidos) => {
        console.log(response);
        this.getDetallePedidos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(detallePedidos: DetallePedidos, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addDetallePedidosModal');
    }
    if (mode === 'edit') {
      this.updateDetallePedidos = detallePedidos;
      button.setAttribute('data-target', '#updateDetallePedidosModal');
    }
    if (mode === 'delete') {
      this.deleteDetallePedidos = detallePedidos;
      button.setAttribute('data-target', '#deleteDetallePedidosModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public abrir(detallePedidos: DetallePedidos | null, mode: string){
    if(mode == 'eliminar'){
      document.getElementById('id02').style.display = 'block';
      this.deleteDetallePedidos = detallePedidos;
    }
    if(mode == 'add'){
      document.getElementById('id01').style.display = 'block';
    }
    if(mode == 'update'){
      document.getElementById('id03').style.display = 'block';
      this.updateDetallePedidos = detallePedidos;
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

