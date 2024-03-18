import { HubConnection } from "@microsoft/signalr";

import ContractModel from "./types/ContractModel";
import ContractState from "./types/ContractState";
import ContractModelCollectionResult from "./types/ContractModelCollectionResult";
import ContractorAddressData from "./types/ContractorAddressData";
import KycSessionKind from "./types/KycSessionKind";
import KycSessionModel from "./types/KycSessionModel";
import IdentityResult from "./types/IdentityResult";
import UserModel from "./types/UserModel";
import SkinTone from "./types/SkinTone";
import HairColor from "./types/HairColor";
import PublicUserModel from "./types/PublicUserModel";
import UserFavoriteModel from "./types/UserFavoriteModel";
import UserState from "./types/UserState";
import PublicUserListModel from "./types/PublicUserListModel";
import DictionaryKind from "./types/DictionaryKind";
import DictionaryModel from "./types/DictionaryModel";
import CountryModel from "./types/CountryModel";
import LanguageModel from "./types/LanguageModel";
import MediaKind from "./types/MediaKind";
import UserMediaModel from "./types/UserMediaModel";
import RestrictionKind from "./types/RestrictionKind";
import UserReverseRestrictionModel from "./types/UserReverseRestrictionModel";
import UserRestrictionModel from "./types/UserRestrictionModel";
import SessionModelCollectionResult from "./types/SessionModelCollectionResult";
import SessionResult from "./types/SessionResult";
import ChatMessageKind from "./types/ChatMessageKind";
import AssetKind from "./types/AssetKind";
import BalanceModel from "./types/BalanceModel";
import OperationKind from "./types/OperationKind";
import BalanceLogModelCollectionResult from "./types/BalanceLogModelCollectionResult";
import TransactionModelCollectionResult from "./types/TransactionModelCollectionResult";
import PaymentMethodKind from "./types/PaymentMethodKind";
import PaymentMethodModel from "./types/PaymentMethodModel";
import MasspayCountry from "./types/MasspayCountry";
import MasspayDestination from "./types/MasspayDestination";
import MasspayAttribute from "./types/MasspayAttribute";
import MasspayAttributeSet from "./types/MasspayAttributeSet";

export class ApiSServer {
  #hub!: HubConnection;
  
  get hub() { return this.#hub; }
  
  constructor(hub: HubConnection) {
    this.#hub = hub;
  }
  
  /**
  * @summary Get actor contract.
  */
  async getContract() {
    return this.#hub.invoke<ContractModel>('GetContract');
  }
  
  /**
  * @summary Initiate user contract for actor role application.
  */
  async createContract() {
    return this.#hub.invoke<void>('CreateContract');
  }
  
  /**
  * @param {ContractState} state Requested states.
  * @summary Get contracts count for the back office.
  */
  async getContractsCount(...args: [state: ContractState]) {
    return this.#hub.invoke<number>('GetContractsCount', ...args);
  }
  
  /**
  * @param {ContractState[]} states Requested contracts states.
  * @param {number} skip Items to skip.
  * @param {number} take Items to take.
  * @summary Get contracts list for the back office.
  */
  async getContracts(...args: [states: ContractState[], skip: number, take: number]) {
    return this.#hub.invoke<ContractModelCollectionResult>('GetContracts', ...args);
  }
  
  /**
  * @param {string} safeId Contract safe id.
  * @param {ContractState} state New contract state.
  * @summary Set existing contract state.
  * @description If contract state will be set to Started then Actor role will be added.
  */
  async setContractState(...args: [safeId: string, state: ContractState]) {
    return this.#hub.invoke<void>('SetContractState', ...args);
  }
  
  /**
  * @param {ContractorAddressData} addressData Contract address definition.
  * @summary Set contract address data.
  */
  async setContractAddress(...args: [addressData: ContractorAddressData]) {
    return this.#hub.invoke<void>('SetContractAddress', ...args);
  }
  
  /**
  * @param {KycSessionKind} kind KYC session kind.
  * @summary Create new KYC session.
  * @description Use this method to get session id. Session id can be used to execute KYC operation from the external devices.
  */
  async createKycSessionAsync(...args: [kind: KycSessionKind]) {
    return this.#hub.invoke<KycSessionModel>('CreateKycSessionAsync', ...args);
  }
  
  /**
  * @param {string} transactionId Liveness check transaction id.
  * @summary Execute identity check.
  * @description User should accomplish document and liveness check.
  */
  async identityCheck(...args: [transactionId: string]) {
    return this.#hub.invoke<boolean>('IdentityCheck', ...args);
  }
  
  /**
  * @summary Notify that contract basic info have been provided.
  */
  async contractBasicInfoProvided() {
    return this.#hub.invoke<void>('ContractBasicInfoProvided');
  }
  
  /**
  * @summary Notify that contract applier pictures have been uploaded.
  */
  async contractPicturesProvided() {
    return this.#hub.invoke<void>('ContractPicturesProvided');
  }
  
  /**
  * @param {string} phoneNumber Phone number to be set to the user profile.
  * @summary Get the OTP code to set phone number.
  */
  async setPhoneNumberGetCode(...args: [phoneNumber: string]) {
    return this.#hub.invoke<void>('SetPhoneNumberGetCode', ...args);
  }
  
  /**
  * @param {string} phoneNumber User existing phone number.
  * @summary Request OTP code.
  * @description Used only for existing account with confirmed phone number.
  */
  async requestOtp(...args: [phoneNumber: string]) {
    return this.#hub.invoke<void>('RequestOtp', ...args);
  }
  
  /**
  * @param {string} phoneNumber New user phone number.
  * @param {string} code OTP code.
  * @summary Set user phone number.
  */
  async setPhoneNumber(...args: [phoneNumber: string, code: string]) {
    return this.#hub.invoke<IdentityResult>('SetPhoneNumber', ...args);
  }
  
  /**
  * @param {string} email User email.
  * @summary Set user unconfirmed email.
  */
  async setEmail(...args: [email: string]) {
    return this.#hub.invoke<IdentityResult>('SetEmail', ...args);
  }
  
  /**
  * @param {string} userName Requested user name.
  * @summary Check user availability with mentioned user name.
  * @description User can have both email or phone number user name. If user has both phone number and email then user name is always phone number.
  */
  async checkAccount(...args: [userName: string]) {
    return this.#hub.invoke<boolean>('CheckAccount', ...args);
  }
  
  /**
  * @summary Get authorized user data.
  */
  async getSigned() {
    return this.#hub.invoke<UserModel>('GetSigned');
  }
  
  /**
  * @param {string} languageCode Language code in ISO 639-1.
  * @summary Set user language.
  */
  async setLanguage(...args: [languageCode: string]) {
    return this.#hub.invoke<void>('SetLanguage', ...args);
  }
  
  /**
  * @param {string} countryCode Country ISO 3166-1 alpha-2 code.
  * @summary Set user country.
  */
  async setCountry(...args: [countryCode: string]) {
    return this.#hub.invoke<void>('SetCountry', ...args);
  }
  
  /**
  * @param {number} weight Weight in kg.
  * @summary Set actor weight.
  */
  async setWeight(...args: [weight: number]) {
    return this.#hub.invoke<void>('SetWeight', ...args);
  }
  
  /**
  * @param {number} height Height in cm.
  * @summary Set user height.
  */
  async setHeight(...args: [height: number]) {
    return this.#hub.invoke<void>('SetHeight', ...args);
  }
  
  /**
  * @param {SkinTone} skinTone Skin tone.
  * @summary Set actor skin tone.
  */
  async setSkinTone(...args: [skinTone: SkinTone]) {
    return this.#hub.invoke<void>('SetSkinTone', ...args);
  }
  
  /**
  * @param {HairColor} hairColor Hair color.
  * @summary Set actor hair color.
  */
  async setHairColor(...args: [hairColor: HairColor]) {
    return this.#hub.invoke<void>('SetHairColor', ...args);
  }
  
  /**
  * @param {string} code Language ISO 639-1.
  * @summary Add actor spoken language.
  */
  async addSpokenLanguage(...args: [code: string]) {
    return this.#hub.invoke<void>('AddSpokenLanguage', ...args);
  }
  
  /**
  * @param {string} code Language ISO 639-1.
  * @summary Remove spoken language.
  */
  async removeSpokenLanguage(...args: [code: string]) {
    return this.#hub.invoke<void>('RemoveSpokenLanguage', ...args);
  }
  
  /**
  * @param {string} safeUserId Safe user entity id.
  * @summary Get user public profile.
  * @description Method available only for users with the Actor role.
  */
  async getPublicUser(...args: [safeUserId: string]) {
    return this.#hub.invoke<PublicUserModel>('GetPublicUser', ...args);
  }
  
  /**
  * @param {number} take Items to take.
  * @summary Get random list of favorite actors for swipe presentation.
  */
  async getFavorites(...args: [take: number]) {
    return this.#hub.invoke<UserFavoriteModel[]>('GetFavorites', ...args);
  }
  
  /**
  * @param {string} safeId Favorite actor id.
  * @summary Get user favorite by its id.
  */
  async getFavorite(...args: [safeId: string]) {
    return this.#hub.invoke<UserFavoriteModel>('GetFavorite', ...args);
  }
  
  /**
  * @param {string} actorSafeId Actor user safe id.
  * @summary Switch user favorite - if actor is favorite then disable it else make actor favorite.
  */
  async switchFavorite(...args: [actorSafeId: string]) {
    return this.#hub.invoke<void>('SwitchFavorite', ...args);
  }
  
  /**
  * @param {string} safeId Actor user safe id.
  * @summary Request for user online sate.
  */
  async checkUserState(...args: [safeId: string]) {
    return this.#hub.invoke<UserState>('CheckUserState', ...args);
  }
  
  /**
  * @param {number} take Items to take.
  * @summary Get list of available actors.
  * @description Returns random actors according to customer/actors restrictions.
  */
  async getActors(...args: [take: number]) {
    return this.#hub.invoke<PublicUserListModel[]>('GetActors', ...args);
  }
  
  /**
  * @param {string} safeId Actor safe id.
  * @summary Get actor for the list.
  */
  async getActor(...args: [safeId: string]) {
    return this.#hub.invoke<PublicUserListModel>('GetActor', ...args);
  }
  
  /**
  * @param {string} actorId Actor safe id.
  * @param {number} rate Rate integer value. Should be between 1 and 5.
  * @summary Rank the actor.
  */
  async rankActor(...args: [actorId: string, rate: number]) {
    return this.#hub.invoke<void>('RankActor', ...args);
  }
  
  /**
  * @param {DictionaryKind} dictionaryKind Dictionary kind.
  * @param {string} languageCode Dicitonary term language.
  * @summary Get dictionary values.
  */
  async getDictionary(...args: [dictionaryKind: DictionaryKind, languageCode: string]) {
    return this.#hub.invoke<DictionaryModel[]>('GetDictionary', ...args);
  }
  
  /**
  * @param {DictionaryKind} dictionaryKind Dictionary kind.
  * @param {string} mask Filter mask. Can aply regex pattern.
  * @param {string} languageCode Dicitonary term language.
  * @summary Get dictionary vaules (filtered).
  */
  async getDictionaryFiltered(...args: [dictionaryKind: DictionaryKind, mask: string, languageCode: string]) {
    return this.#hub.invoke<DictionaryModel[]>('GetDictionaryFiltered', ...args);
  }
  
  /**
  * @param {string} languageCode Text language ISO 639-1 code.
  * @summary Get countries dictionary.
  */
  async getCountries(...args: [languageCode: string]) {
    return this.#hub.invoke<CountryModel[]>('GetCountries', ...args);
  }
  
  /**
  * @param {string} languageCode Text language ISO 639-1 code.
  * @param {string} mask Filter mask. Can apply regex pattern.
  * @summary Get filtered countries dictionary.
  */
  async getCountriesFiltered(...args: [languageCode: string, mask: string]) {
    return this.#hub.invoke<CountryModel[]>('GetCountriesFiltered', ...args);
  }
  
  /**
  * @param {string} languageCode Text language ISO 639-1 code.
  * @summary Get languages dictionary.
  */
  async getLanguages(...args: [languageCode: string]) {
    return this.#hub.invoke<LanguageModel[]>('GetLanguages', ...args);
  }
  
  /**
  * @param {string} languageCode Text language ISO 639-1 code.
  * @param {string} mask Filter mask. Can apply regex pattern.
  * @summary Get filtered languages dictionary.
  */
  async getLanguagesFiltered(...args: [languageCode: string, mask: string]) {
    return this.#hub.invoke<LanguageModel[]>('GetLanguagesFiltered', ...args);
  }
  
  /**
  * @param {string} nickname New nickname.
  * @summary Set user nickname.
  */
  async setUserNickname(...args: [nickname: string]) {
    return this.#hub.invoke<void>('SetUserNickname', ...args);
  }
  
  /**
  * @param {string} bio User biography text.
  * @summary Set user nickname.
  */
  async setUserBio(...args: [bio: string]) {
    return this.#hub.invoke<void>('SetUserBio', ...args);
  }
  
  /**
  * @param {MediaKind[]} kinds Requested media kinds.
  * @summary Get user medias.
  */
  async getUserMedia(...args: [kinds: MediaKind[]]) {
    return this.#hub.invoke<UserMediaModel[]>('GetUserMedia', ...args);
  }
  
  /**
  * @param {string} mediaId Media entity id.
  * @summary Remove user media.
  */
  async removeUserMedia(...args: [mediaId: string]) {
    return this.#hub.invoke<void>('RemoveUserMedia', ...args);
  }
  
  /**
  * @param {RestrictionKind[]} kinds Requested media kinds.
  * @summary Get user reversed restrictions.
  */
  async getUserReversedRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<UserReverseRestrictionModel[]>('GetUserReversedRestrictions', ...args);
  }
  
  /**
  * @param {RestrictionKind[]} kinds Requested media kinds.
  * @summary Get user restrictions.
  */
  async getUserRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<UserRestrictionModel[]>('GetUserRestrictions', ...args);
  }
  
  /**
  * @param {number} skip Entities to skip.
  * @param {number} take Entities to take.
  * @summary Get actor video sessions history.
  */
  async getCalleeSessions(...args: [skip: number, take: number]) {
    return this.#hub.invoke<SessionModelCollectionResult>('GetCalleeSessions', ...args);
  }
  
  /**
  * @param {string} callerSafeId Session initiator safe id.
  * @summary Join initiated video session.
  */
  async joinSession(...args: [callerSafeId: string]) {
    return this.#hub.invoke<SessionResult>('JoinSession', ...args);
  }
  
  /**
  * @param {string} calleeSafeId Callee user safe id.
  * @summary Create video session.
  * @description Returns array of objects:
  */
  async createSession(...args: [calleeSafeId: string]) {
    return this.#hub.invoke<void>('CreateSession', ...args);
  }
  
  /**
  * @summary Get user(actor or customer) active video session.
  */
  async restoreSession() {
    return this.#hub.invoke<SessionResult>('RestoreSession');
  }
  
  /**
  * @summary Finish video session.
  */
  async abortSession(...args: [sessionSafeId: string]) {
    return this.#hub.invoke<void>('AbortSession', ...args);
  }
  
  /**
  * @param {string} sessionSafeId Session safe id.
  * @param {ChatMessageKind} messageKind Message kind
  * @param {string} body Message body in case of text message kind.
  * @summary Post new session message.
  */
  async postSessionMessage(...args: [sessionSafeId: string, messageKind: ChatMessageKind, body: string]) {
    return this.#hub.invoke<void>('PostSessionMessage', ...args);
  }
  
  /**
  * @param {string} messageSafeId Session message safe id.
  * @summary Set and notify on session message delivered.
  */
  async sessionMessageDelivered(...args: [messageSafeId: string]) {
    return this.#hub.invoke<void>('SessionMessageDelivered', ...args);
  }
  
  /**
  * @param {string} sessionSafeId Safe session id.
  * @param {number} amount Amount to donate.
  * @summary Execute donation within video session.
  */
  async sessionDonate(...args: [sessionSafeId: string, amount: number]) {
    return this.#hub.invoke<void>('SessionDonate', ...args);
  }
  
  /**
  * @param {string} id Text id.
  * @param {string} code Text language ISO 639-1 code.
  * @summary Request text string.
  * @description Returns null in case of not found.
  */
  async getText(...args: [id: string, code: string]) {
    return this.#hub.invoke<string>('GetText', ...args);
  }
  
  /**
  * @param {AssetKind} assetKind Requested balance asset kind.
  * @summary Request user balance.
  */
  async getBalance(...args: [assetKind: AssetKind]) {
    return this.#hub.invoke<BalanceModel>('GetBalance', ...args);
  }
  
  /**
  * @param {number} amount Amount to withdraw.
  * @summary Withdraw actor funds into default bank card.
  */
  async withdraw(...args: [amount: number]) {
    return this.#hub.invoke<void>('Withdraw', ...args);
  }
  
  /**
  * @param {string} balanceId Balance entity id.
  * @param {OperationKind[]} kinds Requested operations kinds.
  * @param {number} skip Items to skip.
  * @param {number} take Items to take.
  * @summary Get user balance log.
  */
  async getBalanceLog(...args: [balanceId: string, kinds: OperationKind[], skip: number, take: number]) {
    return this.#hub.invoke<BalanceLogModelCollectionResult>('GetBalanceLog', ...args);
  }
  
  /**
  * @param {OperationKind[]} kinds Requested operations kinds.
  * @param {number} skip Items to skip.
  * @param {number} take Items to take.
  * @summary Get user transactions.
  */
  async getTransactions(...args: [kinds: OperationKind[], skip: number, take: number]) {
    return this.#hub.invoke<TransactionModelCollectionResult>('GetTransactions', ...args);
  }
  
  /**
  * @param {PaymentMethodKind} kind Payment method kind.
  * @param {string} code Payment method code.
  * @param {Date} expiry Payment method expiration date (month and year).
  * @param {string} secCode Payment method security code (CVV, CVS, etc.)
  * @summary Add user new payment method.
  */
  async createPaymentMethod(...args: [kind: PaymentMethodKind, code: string, expiry: Date, secCode: string]) {
    return this.#hub.invoke<boolean>('CreatePaymentMethod', ...args);
  }
  
  /**
  * @summary Get user payment methods.
  */
  async getUserMethods() {
    return this.#hub.invoke<PaymentMethodModel[]>('GetUserMethods');
  }
  
  /**
  * @param {string} safeId USer payment method safe id.
  * @summary Delete user payment method.
  */
  async deleteUserMethod(...args: [safeId: string]) {
    return this.#hub.invoke<void>('DeleteUserMethod', ...args);
  }
  
  /**
  * @param {string} safeId Payment method safe id.
  * @summary Switch payment method default flag.
  */
  async switchDefaultMethod(...args: [safeId: string]) {
    return this.#hub.invoke<void>('SwitchDefaultMethod', ...args);
  }
  
  /**
  * @summary Get available countries for payout.
  */
  async getPayoutsCountries() {
    return this.#hub.invoke<MasspayCountry[]>('GetPayoutsCountries');
  }
  
  /**
  * @param {string} countryCode Country code searching services for. 3 letters ISO_3166 code.
  * @param {number} amount The amount to withdraw (gross).
  * @summary Get available payouts methods for selected country.
  */
  async getPayoutsDestination(...args: [countryCode: string, amount: number]) {
    return this.#hub.invoke<MasspayDestination[]>('GetPayoutsDestination', ...args);
  }
  
  /**
  * @param {string} destinationToken Payout method token.
  * @param {string} currency Payout currency (can be taken from payout method exchange rate).
  * @summary Get required attributes for selected payout method.
  */
  async getPayoutAttributes(...args: [destinationToken: string, currency: string]) {
    return this.#hub.invoke<MasspayAttribute[]>('GetPayoutAttributes', ...args);
  }
  
  /**
  * @param {string} destinationToken Payout method token.
  * @param {string} currency Payout currency.
  * @param {MasspayAttributeSet[]} attributes Payout method attributes.
  * @summary Set payout method attributes.
  */
  async setPayoutAttributes(...args: [destinationToken: string, currency: string, attributes: MasspayAttributeSet[]]) {
    return this.#hub.invoke<string>('SetPayoutAttributes', ...args);
  }
  
  /**
  * @param {string} destinationToken Payout method token.
  * @param {string} attributesToken Payout method attributes token.
  * @param {number} amount Payout amount in source currency (USD).
  * @param {string} country Payout country.
  * @summary Execute payout.
  */
  async executePayout(...args: [destinationToken: string, attributesToken: string, amount: number, country: string]) {
    return this.#hub.invoke<void>('ExecutePayout', ...args);
  }
  
  /**
  * @summary Get reverse restirction is on or not.
  */
  async isRrEnabled(...args: [kind: RestrictionKind]) {
    return this.#hub.invoke<boolean>('IsRrEnabled', ...args);
  }
  
  /**
  * @summary Get restirction is on or not.
  */
  async isREnabled(...args: [kind: RestrictionKind]) {
    return this.#hub.invoke<boolean>('IsREnabled', ...args);
  }
  
  /**
  * @param {RestrictionKind} kind Restriction kind.
  * @param {string} value Restriction value.
  * @param {boolean} replace Replace existing restrictions with the same kind.
  * @summary Add restriction.
  */
  async addRestriction(...args: [kind: RestrictionKind, value: string, replace: boolean]) {
    return this.#hub.invoke<string>('AddRestriction', ...args);
  }
  
  /**
  * @param {string} safeId Restriction safe id.
  * @summary Remove authorized user restriction.
  */
  async removeRestriction(...args: [safeId: string]) {
    return this.#hub.invoke<void>('RemoveRestriction', ...args);
  }
  
  /**
  * @param {RestrictionKind} kind Criteria kind.
  * @param {string} value Value.
  * @param {boolean} replace Replace existing restrictions with the same kind.
  * @summary Add actor search criteria (reverse restriction).
  */
  async addReverseRestriction(...args: [kind: RestrictionKind, value: string, replace: boolean]) {
    return this.#hub.invoke<string>('AddReverseRestriction', ...args);
  }
  
  /**
  * @param {RestrictionKind} kind Restriction kind.
  * @summary Get actors search criteria (reverse restrictions).
  */
  async getUserReverseRestrictions(...args: [kind: RestrictionKind]) {
    return this.#hub.invoke<UserReverseRestrictionModel[]>('GetUserReverseRestrictions', ...args);
  }
  
  /**
  * @param {string} safeId Reverse restriction id.
  * @summary Remove actor search criteria.
  */
  async removeReverseRestriction(...args: [safeId: string]) {
    return this.#hub.invoke<void>('RemoveReverseRestriction', ...args);
  }
  
  /**
  * @param {RestrictionKind[]} kinds Restrictions kinds.
  * @summary Disable active restrictions.
  */
  async disableRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<void>('DisableRestrictions', ...args);
  }
  
  /**
  * @param {RestrictionKind[]} kinds Restrictions kinds.
  * @summary Activate disabled restrictions.
  */
  async activateRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<void>('ActivateRestrictions', ...args);
  }
  
  /**
  * @param {RestrictionKind[]} kinds REstrictions kinds.
  * @summary Disable active reversed restrictions.
  */
  async disableReverseRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<void>('DisableReverseRestrictions', ...args);
  }
  
  async activateReverseRestrictions(...args: [kinds: RestrictionKind[]]) {
    return this.#hub.invoke<void>('ActivateReverseRestrictions', ...args);
  }
  
  /**
  * @summary Disable mobile only reverse restriction.
  */
  async switchMobileOnly() {
    return this.#hub.invoke<void>('SwitchMobileOnly');
  }
  
  /**
  * @param {UserState} state On-line state.
  * @summary Set user on-line state.
  * @description Used by actors only to set on-line state (be available or not for the call).
  */
  async setState(...args: [state: UserState]) {
    return this.#hub.invoke<void>('SetState', ...args);
  }
  
  /**
  * @summary Make actor on-line (visible).
  */
  async setOnlineState() {
    return this.#hub.invoke<void>('SetOnlineState');
  }
  
  /**
  * @summary Make actor off-line (invisible).
  */
  async setOfflineState() {
    return this.#hub.invoke<void>('SetOfflineState');
  }
  
  /**
  * @summary Set actor role.
  */
  async setActorRoleState() {
    return this.#hub.invoke<void>('SetActorRoleState');
  }
  
  /**
  * @summary Set user role.
  */
  async setUserRoleState() {
    return this.#hub.invoke<void>('SetUserRoleState');
  }
  
  /**
  * @summary Set admin role.
  */
  async setAdminRoleState() {
    return this.#hub.invoke<void>('SetAdminRoleState');
  }
}