export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
