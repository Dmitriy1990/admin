export default interface MasspayExchangeRate {
  /** @description The currency symbol for the exchange rate. E.g. USD, EUR, etc. */
  currency_symbol: (string | null);

  /** @description The exchange rate for the currency. The ratio of the source amount to the destination amount in the currency. */
  exchange_rate: number;
}