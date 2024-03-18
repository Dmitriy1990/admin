import BalanceLogModel from "./BalanceLogModel";

export default interface BalanceLogModelCollectionResult {
  /** @description Gets or sets total items count. */
  totalRecords: number;

  /** @description Gets or sets items. */
  collection: (BalanceLogModel[] | null);
}