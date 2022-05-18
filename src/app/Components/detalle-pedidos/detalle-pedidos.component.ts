import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DetallePedidos } from 'src/app/Classes/detalle-pedidos';
import { DetallePedidosService } from 'src/app/Service/detalle-pedidos.service';

@Component({
  selector: 'app-detalle-pedidos',
  templateUrl: './detalle-pedidos.component.html',
  styleUrls: ['./detalle-pedidos.component.css']
})
export class DetallePedidosComponent implements OnInit {
  detallePedidos: DetallePedidos[];
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
}
