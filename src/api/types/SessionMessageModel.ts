import ChatMessageKind from "./ChatMessageKind";
import MessageState from "./MessageState";
import PublicUserModel from "./PublicUserModel";

export default interface SessionMessageModel {
  /** @description Session message entity safe id. */
  readonly safeId: (string | null);

  /** @description Session entity safe id. */
  readonly sessionSafeId: (string | null);

  /** @description Message time stamp. */
  ts: string;

  /** @description Time when message was delivered. */
  deliverTs: (string | null);

  kind: ChatMessageKind;

  state: MessageState;

  /** @description Message body. */
  data: (string | null);

  user: PublicUserModel;
}