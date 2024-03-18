enum ContractState {
  New = 0,
  BasicInfoProvided = 1,
  PicturesProvided = 2,
  DocumentChecked = 4,
  IdentityChecked = 8,
  AddressChecked = 16,
  Started = 32,
  Rejected = 64,
}

export default ContractState;