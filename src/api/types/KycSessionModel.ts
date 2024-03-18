import KycSessionKind from "./KycSessionKind";

export default interface KycSessionModel {
  id: (number | null);

  /** @description KYC session safe id. */
  readonly safeId: (string | null);

  /** @description User associated with the model. */
  userId: number;

  /** @description Session created time stamp. */
  ts: string;

  kind: KycSessionKind;
}