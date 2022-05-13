import { Pedidos } from "./pedidos";
import { Productos } from "./productos";

export class DetallePedidos {
    id: number;
    pedidos: Pedidos;
    productos: Productos;
    cantidad: number;
    precioUnidad: number;
}
