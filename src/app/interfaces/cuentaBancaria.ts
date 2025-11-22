export interface CuentaBancaria {
  id: number;
  banco: string;
  numero: string;
  tipo: 'Débito' | 'Crédito' | 'Ahorros';
}
