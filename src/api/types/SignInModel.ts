import LoginKind from "./LoginKind";

export default interface SignInModel {
  /** @description User login. */
  login: (string | null);

  /** @description User password. */
  password: (string | null);

  signInMethod: LoginKind;

  /** @description Country code. */
  countryCode: (string | null);

  /** @description Language code. */
  languageCode: (string | null);
}