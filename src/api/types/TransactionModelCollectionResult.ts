import TransactionModel from "./TransactionModel";

export default interface TransactionModelCollectionResult {
  /** @description Gets or sets total items count. */
  totalRecords: number;

  /** @description Gets or sets items. */
  collection: (TransactionModel[] | null);
}