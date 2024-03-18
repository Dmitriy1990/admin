import MasspayExchangeRate from "./MasspayExchangeRate";

export default interface MasspayDestination {
  /** @description The logo of the company in base64 format. */
  company_logo: (string | null);

  /** @description The name of the company. */
  company_name: (string | null);

  /** @description The description of the company. */
  description: (string | null);

  /** @description The rating of the company. */
  rating: number;

  /** @description The delivery type of the service. E.g. BANK_DEPOSIT, CASH_PICKUP, etc. */
  delivery_type: (string | null);

  /** @description The exchange rate for the payer. A list of objects with currency_symbol and exchange_rate properties. */
  exchange_rate: (MasspayExchangeRate[] | null);

  /** @description The source amount for the payer. The amount to be sent by the user. */
  source_amount: number;

  /** @description The destination token for the payer. A unique identifier for the destination account or location. */
  destination_token: (string | null);

  /** @description Whether the destination token is dynamic or not. A dynamic token means that it can be changed by the user at any time. */
  is_dynamic_token: boolean;

  /** @description The name of the payer. E.g. Instant Pay, Next Day Bank Deposit, etc. */
  payer_name: (string | null);

  /** @description The fee for the payer. The amount to be charged by the company for the service. */
  fee: number;

  /** @description The maximum limit for the payer. The maximum amount that can be sent by the user using this payer. */
  max_limit: number;

  /** @description The minimum limit for the payer. The minimum amount that can be sent by the user using this payer. */
  min_limit: number;

  /** @description The number of locations for the payer. The number of available destinations or pick up points for this payer. */
  number_of_locations: number;

  /** @description The estimated availability for the payer. The date and time when the funds will be available to the recipient using this payer. */
  estimated_availability: string;

  /** @description The additional description for the payer. Any extra information or details about this payer. */
  additional_description: (string | null);
}