export type Currency = 'EUR' | 'USD' | 'GBP' | 'CHF';

const RATES: Record<Currency, { symbol: string; rate: number }> = {
  EUR: { symbol: '€', rate: 1.0 },
  USD: { symbol: '$', rate: 1.08 },
  GBP: { symbol: '£', rate: 0.85 },
  CHF: { symbol: 'CHF', rate: 0.96 },
};

export function formatCurrency(amountEUR: number, currency: Currency = 'EUR'): string {
  const { symbol, rate } = RATES[currency] || RATES.EUR;
  const converted = amountEUR * rate;

  if (currency === 'CHF') {
    return `${Math.round(converted).toLocaleString()} CHF`;
  }

  return `${symbol}${Math.round(converted).toLocaleString()}`;
}
