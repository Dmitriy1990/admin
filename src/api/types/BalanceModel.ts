import AssetKind from "./AssetKind";

export default interface BalanceModel {
  /** @description Entity safe id. */
  readonly safeId: (string | null);

  /** @description Owner id. */
  userId: number;

  assetKind: AssetKind;

  /** @description Balance volume in atomic values. */
  volume: number;

  /** @description Balance pending charges volume. */
  pending: number;
}