import { HubConnection } from "@microsoft/signalr";

import UserState from "./types/UserState";
import AssetKind from "./types/AssetKind";
import OperationKind from "./types/OperationKind";
import BalanceModel from "./types/BalanceModel";
import SessionModel from "./types/SessionModel";
import SessionResult from "./types/SessionResult";
import SessionMessageModel from "./types/SessionMessageModel";
import ContractState from "./types/ContractState";

export class ApiSClient {
  #hub!: HubConnection;
  
  get hub() { return this.#hub; }
  
  constructor(hub: HubConnection) {
    this.#hub = hub;
  }
  
  /**
  * @param {string} userId Safe user id.
  * @param {UserState} state On-line state.
  * @summary Notify clients on client on-line state change.
  */
  onUserStateUpdated(listener: (...args: [userId: string, state: UserState]) => any) {
    this.#hub.on('UserStateUpdated', listener);
    return () => { this.#hub.off('UserStateUpdated', listener); };
  }
  
  /**
  * @param {AssetKind} assetKind Balance asset kind.
  * @param {OperationKind} operationKind Balance update operation kind.
  * @param {BalanceModel} balance Current user balance model.
  * @summary Notify on user balance updated.
  */
  onBalanceUpdated(listener: (...args: [assetKind: AssetKind, operationKind: OperationKind, balance: BalanceModel]) => any) {
    this.#hub.on('BalanceUpdated', listener);
    return () => { this.#hub.off('BalanceUpdated', listener); };
  }
  
  /**
  * @param {SessionModel} session Session definition.
  * @summary Notify on new video session.
  */
  onSessionCreated(listener: (...args: [session: SessionModel]) => any) {
    this.#hub.on('SessionCreated', listener);
    return () => { this.#hub.off('SessionCreated', listener); };
  }
  
  /**
  * @param {SessionModel} session Session definition.
  * @summary Notify on video session abort.
  */
  onSessionAborted(listener: (...args: [session: SessionModel]) => any) {
    this.#hub.on('SessionAborted', listener);
    return () => { this.#hub.off('SessionAborted', listener); };
  }
  
  /**
  * @param {SessionResult} session Session definition.
  * @summary Inform customer on session started.
  */
  onSessionStarted(listener: (...args: [session: SessionResult]) => any) {
    this.#hub.on('SessionStarted', listener);
    return () => { this.#hub.off('SessionStarted', listener); };
  }
  
  /**
  * @param {SessionMessageModel} message Message definition.
  * @summary Notify on video session message.
  */
  onSessionMessage(listener: (...args: [message: SessionMessageModel]) => any) {
    this.#hub.on('SessionMessage', listener);
    return () => { this.#hub.off('SessionMessage', listener); };
  }
  
  /**
  * @param {string} messageId Session message entity safe id.
  * @summary Session message delivered.
  */
  onSessionMessageDelivered(listener: (...args: [messageId: string]) => any) {
    this.#hub.on('SessionMessageDelivered', listener);
    return () => { this.#hub.off('SessionMessageDelivered', listener); };
  }
  
  /**
  * @param {ContractState} state New contract state.
  * @summary Notify on contract state changed.
  */
  onContractStateChanged(listener: (...args: [state: ContractState]) => any) {
    this.#hub.on('ContractStateChanged', listener);
    return () => { this.#hub.off('ContractStateChanged', listener); };
  }
  
  /**
  * @summary Client should be disconnects.
  */
  onDisconnect(listener: () => void) {
    this.#hub.on('Disconnect', listener);
    return () => { this.#hub.off('Disconnect', listener); };
  }
}