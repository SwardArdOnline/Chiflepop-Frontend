import { Producto } from "./producto";

export interface CartItem {
  producto: Producto;
  cantidad: number;
}