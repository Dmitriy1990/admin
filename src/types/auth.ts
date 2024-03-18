export interface RegisterModel {
  login: string;
  password: string | null;
  loginKind: LoginKind;
  languageCode: string;
  countryCode: string;
  affiliateName: string | null;
}

export enum LoginKind {
  Email,
  PhoneNumber,
  Username,
}

export interface IdentityResult {
  succeeded: boolean;
  errors: IdentityError[];
}

export interface IdentityError {
  code: string;
  description: string;
}

export interface ReverceRestrictions {
  safeId: string;
  userSafeId: string;
  kind: number;
  state: number;
  data: string;
}

export interface Claims {
  safeId: string;
  type: "name" | any;
  value: string;
}

export interface Media {
  safeId: string;
  kind: 0;
  state: 1;
  sequence: 0;
  alias: string;
}

export type Roles = ["user" | "actor"];

export interface Account {
  safeId: string;
  userName: string;
  email: null | string;
  phoneNumber: string;
  languageCode: string;
  countryCode: string;
  creationTs: string;
  state: number;
  lockedTill: null;
  roles: Roles;
  restrictions: any[];
  reverceRestrictions: ReverceRestrictions[];
  searchCriterias: any[];
  media: Media[];
  claims: Claims[];
  age: number | null;
}
