import ContractModel from "./ContractModel";

export default interface ContractModelCollectionResult {
  /** @description Gets or sets total items count. */
  totalRecords: number;

  /** @description Gets or sets items. */
  collection: (ContractModel[] | null);
}