import PaymentMethodKind from "./PaymentMethodKind";
import PaymentMethodState from "./PaymentMethodState";

export default interface PaymentMethodModel {
  /** @description Payment method id. */
  id: (number | null);

  /** @description Payment method safe id. */
  readonly safeId: (string | null);

  /** @description Payment method owner entity id. */
  userId: number;

  kind: PaymentMethodKind;

  state: PaymentMethodState;

  /** @description Payment method code */
  code: (string | null);

  /** @description Payment public code. */
  readonly publicCode: (string | null);

  /** @description Payment method expiration date. */
  expiryDate: string;

  /** @description Payment method security code (CVV/CVC). */
  securtyCode: (string | null);

  /** @description Will payment method going to be used for charges. */
  isDefault: boolean;
}