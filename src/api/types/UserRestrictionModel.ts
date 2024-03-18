import RestrictionKind from "./RestrictionKind";
import RestrictionState from "./RestrictionState";

export default interface UserRestrictionModel {
  /** @description User restriction safe id. */
  readonly safeId: (string | null);

  kind: RestrictionKind;

  state: RestrictionState;

  /** @description Restriction value. */
  data: (string | null);
}