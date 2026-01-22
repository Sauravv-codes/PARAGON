import React, { createContext, useContext, useState } from 'react';

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'NPR';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountInINR: number) => string;
  convert: (amountInINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const defaultRates: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
  NPR: 1.6,
};

const currencyLocale: Record<Currency, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  AUD: 'en-AU',
  NPR: 'en-NP',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('NPR');

  const format = (amountInINR: number) => {
    const rate = defaultRates[currency] || 1;
    const value = amountInINR * rate;
    try {
      return new Intl.NumberFormat(currencyLocale[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(value);
    } catch (e) {
      return `${currency} ${value.toFixed(0)}`;
    }
  };

  const convert = (amountInINR: number) => {
    const rate = defaultRates[currency] || 1;
    return amountInINR * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};

export type { Currency };
