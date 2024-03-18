import OperationKind from "./OperationKind";
import BalanceOpState from "./BalanceOpState";

export default interface BalanceLogModel {
  /** @description Entity safe id. */
  readonly safeId: (string | null);

  /** @description Adjustment delta in atomic values. */
  delta: number;

  operationKind: OperationKind;

  state: BalanceOpState;

  /** @description Operation time stamp. */
  ts: string;

  /** @description Time stamp when the balance will be adjusted. */
  commitTs: string;

  /** @description Operation reference. Usually object id initiated balance adjustment. For instance Session id. */
  reference: (string | null);
}