export default interface MasspayCountry {
  /** @description The code of the country. */
  code: (string | null);

  /** @description The name of the country. */
  name: (string | null);

  /** @description The three letter code of the country. */
  three_letter_code: (string | null);

  /** @description The ISO numeric code of the country. */
  iso_numeric: number;
}