export function formatToCurrency(value: number | string, currencyCode = 'USD', locale = 'en-US') {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(0);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue);
}