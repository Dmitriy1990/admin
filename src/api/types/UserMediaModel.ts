import MediaKind from "./MediaKind";
import MediaState from "./MediaState";

export default interface UserMediaModel {
  /** @description Enitity safe id. */
  readonly safeId: (string | null);

  kind: MediaKind;

  state: MediaState;

  /** @description Media sequence. Media should be placed according to it's sequence. */
  sequence: number;

  /** @description Exteranl url proxied source. */
  alias: (string | null);
}