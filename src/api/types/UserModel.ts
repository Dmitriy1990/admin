import UserState from "./UserState";
import SkinTone from "./SkinTone";
import HairColor from "./HairColor";
import UserRestrictionModel from "./UserRestrictionModel";
import UserReverseRestrictionModel from "./UserReverseRestrictionModel";
import UserMediaModel from "./UserMediaModel";

export default interface UserModel {
  /** @description User safe id. */
  readonly safeId: (string | null);

  /** @description User name. */
  userName: (string | null);

  /** @description User email. */
  email: (string | null);

  /** @description Phone number. */
  phoneNumber: (string | null);

  /** @description User language code (ISO 639-1). */
  languageCode: (string | null);

  /** @description User creation date. */
  creationTs: string;

  state: UserState;

  /** @description User lockout date. */
  lockedTill: (string | null);

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

  skinTone: SkinTone;

  hairColor: HairColor;

  /** @description Weight. */
  readonly weight: (number | null);

  /** @description Height. */
  readonly height: (number | null);

  /** @description User roles. */
  roles: (string[] | null);

  /** @description User restrictions. */
  restrictions: (UserRestrictionModel[] | null);

  /** @description User reversed restrictions. */
  reverceRestrictions: (UserReverseRestrictionModel[] | null);

  /** @description User medias. */
  media: (UserMediaModel[] | null);
}