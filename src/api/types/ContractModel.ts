import ContractState from "./ContractState";
import GenderKind from "./GenderKind";
import DateOnly from "./DateOnly";
import UserModel from "./UserModel";

export default interface ContractModel {
  /** @description Contract entity id. */
  id: (number | null);

  /** @description Contract entity safe id. */
  readonly safeId: (string | null);

  /** @description Contract user id. */
  userId: number;

  state: ContractState;

  /** @description Contract start time stamp. */
  startTs: (string | null);

  /** @description Contract stop time stamp. */
  stopTs: (string | null);

  /** @description User first name. */
  firstName: (string | null);

  /** @description User last name. */
  lastName: (string | null);

  gender: GenderKind;

  birthDate: DateOnly;

  /** @description Nationality country ISO 3166-1 alpha-2 code. */
  nationality: (string | null);

  /** @description Address of residence. */
  address: (string | null);

  /** @description City of residence. */
  city: (string | null);

  /** @description State/province of residence. */
  province: (string | null);

  /** @description Postal/zip code. */
  postalCode: (string | null);

  /** @description Country of residence (ISO 3166-3 code). */
  country: (string | null);

  /** @description Url to the ID/Passport document image. */
  documentSource: (string | null);

  /** @description Liveness assessment check reference. */
  identityCheck: (string | null);

  user: UserModel;
}