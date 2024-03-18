import IdentityError from "./IdentityError";

export default interface IdentityResult {
  readonly succeeded: boolean;

  readonly errors: (IdentityError[] | null);
}