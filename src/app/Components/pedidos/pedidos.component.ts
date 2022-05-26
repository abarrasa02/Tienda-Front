import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pedidos } from 'src/app/Classes/pedidos';
import { PedidosService } from 'src/app/Service/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedidos[];
  updatePedidos:Pedidos;
  deletePedidos:Pedidos;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];
  constructor( private pedidosService: PedidosService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPedidos();
    this.spinner.show();

    setTimeout(() => {
     
      this.spinner.hide();
  }, 1000);
  }
  public getPedidos(): void {
      this.pedidosService.findAll().subscribe(
        (response: Pedidos[]) => {
          this.pedidos = response;
          console.log(this.pedidos);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public AddPedidos(addForm: NgForm): void {
      document.getElementById('add-Pedidos-form')?.click();
      this.pedidosService.addPedidos(addForm.value).subscribe(
        (response: Pedidos) => {
          console.log(response);
          this.getPedidos();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
  
    public onUpdatePedidos(pedidos: Pedidos): void {
      console.log('Pedidosedit', pedidos);
      
       this.pedidosService.updatePedidos(pedidos).subscribe(
         (response: Pedidos) => {
         console.log(response);
         this.getPedidos();
        },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
    }
    public onDeletePedidos(pedidoId: number): void {
      this.pedidosService.deletePedidos(pedidoId).subscribe(
        (response: Pedidos) => {
          console.log(response);
          this.getPedidos();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public onOpenModal(pedidos: Pedidos, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addPedidosModal');
      }
      if (mode === 'edit') {
        this.updatePedidos = pedidos;
        button.setAttribute('data-target', '#updatePedidosModal');
      }
      if (mode === 'delete') {
        this.deletePedidos = pedidos;
        button.setAttribute('data-target', '#deletePedidosModal');
      }
      container!.appendChild(button);
      button.click();
    }
    public abrir(pedidos: Pedidos | null, mode: string){
      if(mode == 'eliminar'){
        document.getElementById('id02').style.display = 'block';
        this.deletePedidos = pedidos;
      }
      if(mode == 'add'){
        document.getElementById('id01').style.display = 'block';
      }
      if(mode == 'update'){
        document.getElementById('id03').style.display = 'block';
        this.updatePedidos = pedidos;
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
