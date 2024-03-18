import RestrictionKind from "./RestrictionKind";
import RestrictionState from "./RestrictionState";

export default interface UserReverseRestrictionModel {
  /** @description Entity JSON ignore. */
  readonly safeId: (string | null);

  kind: RestrictionKind;

  state: RestrictionState;

  /** @description Restriction dynamic value. */
  data: (string | null);
}