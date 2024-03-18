import LoginKind from "./LoginKind";
import AffiliateSource from "./AffiliateSource";

export default interface RegisterModel {
  /** @description Gets or sets user login. */
  login: (string | null);

  /** @description Gets or sets new user password. */
  password: (string | null);

  loginKind: LoginKind;

  /** @description Gets or sets preferred user language code. */
  languageCode: (string | null);

  /** @description Country code. */
  countryCode: (string | null);

  affiliateSource: AffiliateSource;

  /** @description Affiliate settlements platform offer consumer reference. */
  affiliateConsumer: (string | null);
}