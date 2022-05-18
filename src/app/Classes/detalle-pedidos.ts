import { Pedidos } from "./pedidos";
import { Productos } from "./productos";

export class DetallePedidos {
    id: number;
    pedidoId: number;
    productosId: number;
    cantidad: number;
    precioUnidad: number;
}
