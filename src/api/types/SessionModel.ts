import SessionState from "./SessionState";
import PublicUserModel from "./PublicUserModel";

export default interface SessionModel {
  /** @description Video session safe id. */
  readonly safeId: (string | null);

  state: SessionState;

  /** @description Time stamp when session was created. */
  creationTs: string;

  /** @description Video session start time stamp (caller + callee joined). */
  startTs: (string | null);

  /** @description Video session payed time end time stamp. */
  stopTs: (string | null);

  /** @description Payed video session duration. */
  duration: number;

  /** @description Default session actor charges ratio. */
  readonly ratio: number;

  /** @description How much callee will get for the call. */
  readonly netCharges: (number | null);

  callee: PublicUserModel;

  caller: PublicUserModel;
}