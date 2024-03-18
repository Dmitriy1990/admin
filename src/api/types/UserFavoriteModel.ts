import FavoriteState from "./FavoriteState";
import PublicUserModel from "./PublicUserModel";

export default interface UserFavoriteModel {
  /** @description Entity safe id. */
  readonly safeId: (string | null);

  /** @description Added to favorite date. */
  startTs: string;

  state: FavoriteState;

  /** @description Favorite entity remove date. */
  endTs: (string | null);

  user: PublicUserModel;
}