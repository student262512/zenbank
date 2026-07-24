export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN').format(new Date(date));
}
