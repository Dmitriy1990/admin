import SessionModel from "./SessionModel";

export default interface SessionModelCollectionResult {
  /** @description Gets or sets total items count. */
  totalRecords: number;

  /** @description Gets or sets items. */
  collection: (SessionModel[] | null);
}