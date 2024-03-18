import UserState from "./UserState";
import UserMediaModel from "./UserMediaModel";

export default interface PublicUserModel {
  /** @description User entity safe id. */
  readonly safeId: (string | null);

  /** @description Unique object identifier. */
  readonly uid: string;

  /** @description User native ISO 639-1 language code. */
  languageCode: (string | null);

  /** @description Profile creation date. */
  creationTs: string;

  state: UserState;

  /** @description User age. */
  readonly age: (number | null);

  /** @description Price for the call if user is the actor. */
  readonly price: number;

  /** @description Call duration. */
  readonly duration: number;

  /** @description User name. */
  readonly name: (string | null);

  /** @description User spoken languages. */
  readonly languages: (string[] | null);

  /** @description User nationality. Use current country code instead if empty. */
  readonly country: (string | null);

  /** @description User AD. */
  readonly bio: (string | null);

  /** @description User votes. */
  readonly votes: (number | null);

  /** @description User rank. */
  readonly rank: (number | null);

  /** @description User profile media. */
  media: (UserMediaModel[] | null);
}