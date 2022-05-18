import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/Classes/pedidos';
import { Usuarios } from 'src/app/Classes/usuarios';
import { PedidosService } from 'src/app/Service/pedidos.service';
import { UsuariosService } from 'src/app/Service/usuarios.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedidos[];


  constructor( private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.getPedidos();
   
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
 

}
