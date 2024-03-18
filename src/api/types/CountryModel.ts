import TextModel from "./TextModel";

export default interface CountryModel {
  /** @description Entity id. */
  id: (number | null);

  /** @description Country ISO 3166-1 alpha-2 code. */
  code: (string | null);

  /** @description Country ISO 3166-1 alpha-3 code. */
  code3: (string | null);

  /** @description Country ISO 3166-1 numeric code. */
  code3Num: (string | null);

  /** @description Country phone code. */
  phoneCode: (string | null);

  /** @description Maximum phone number NSN length (excluding country code). */
  phoneLength: number;

  /** @description Phone number format. */
  phoneFmt: (string | null);

  /** @description Country name text entity id. */
  textId: number;

  /** @description Country presentation order in case of similar results. */
  order: (number | null);

  text: TextModel;
}