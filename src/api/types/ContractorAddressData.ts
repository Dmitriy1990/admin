export default interface ContractorAddressData {
  /** @description Address of residence. */
  address: (string | null);

  /** @description City of residence. */
  city: (string | null);

  /** @description State/province of residence. */
  province: (string | null);

  /** @description Postal/zip code. */
  postalCode: (string | null);

  /** @description Country of residence (ISO 3166-3 code). */
  country: (string | null);
}