import { Pedidos } from "./pedidos";
import { Productos } from "./productos";

export class DetallePedidos {
    id: number;
    pedidoId: number;
    productosId: number;
    pedidos: Pedidos;
    productos: number;
    cantidad: number;
    precioUnidad: number;
}
