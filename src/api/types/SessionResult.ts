import SessionModel from "./SessionModel";

export default interface SessionResult {
  session: SessionModel;

  /** @description Session access token. */
  token: (string | null);
}