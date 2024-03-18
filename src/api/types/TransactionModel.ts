import TransactionState from "./TransactionState";
import OperationKind from "./OperationKind";
import PaymentMethodModel from "./PaymentMethodModel";

export default interface TransactionModel {
  /** @description Transaction id. */
  id: (number | null);

  /** @description Transaction safe id. */
  readonly safeId: (string | null);

  state: TransactionState;

  operationKind: OperationKind;

  /** @description Transaction reference (object initiated the transaction). */
  reference: (string | null);

  /** @description Transaction time stamp. */
  ts: string;

  /** @description External transaction id. */
  externalId: (string | null);

  /** @description Transaction currency. */
  currency: (string | null);

  /** @description Transaction amount. */
  amount: number;

  paymentMethod: PaymentMethodModel;
}