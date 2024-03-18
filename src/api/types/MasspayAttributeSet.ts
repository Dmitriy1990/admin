export default interface MasspayAttributeSet {
  /** @description The token that represents the attribute that needs to be updated. */
  token: (string | null);

  /** @description The value that needs to be stored for the associated token. */
  value: (string | null);
}