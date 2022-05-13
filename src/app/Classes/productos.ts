import { Categorias } from "./categorias";

export class Productos {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    rebaja: number;
    categoria: Categorias;
}
