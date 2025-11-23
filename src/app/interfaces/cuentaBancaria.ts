export interface CuentaBancaria {
  id: number;
  banco: string;
  numeroCuenta: string;
  tipo: string;
  saldo: number;
  esPrincipal: boolean;
}