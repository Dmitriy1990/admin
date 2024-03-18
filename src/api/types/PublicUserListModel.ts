import PublicUserModel from "./PublicUserModel";

export default interface PublicUserListModel {
  /** @description Is actor is favorite for requested customer. */
  isFavourite: boolean;

  publicUser: PublicUserModel;
}