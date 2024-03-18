export default interface MasspayAttribute {
  /** @description The input type of the attribute. E.g. text, number, date, etc. */
  input_type: (string | null);

  /** @description The token of the attribute. A unique identifier for the attribute. */
  token: (string | null);

  /** @description The attribute set token of the attribute. A unique identifier for the group of attributes that this attribute belongs to. */
  attr_set_token: (string | null);

  /** @description The label of the attribute. The name or description of the attribute that is displayed to the user. */
  label: (string | null);

  /** @description The validation of the attribute. A regular expression that defines the format or pattern of the attribute value. */
  validation: (string | null);

  /** @description Whether the attribute is optional or not. A boolean value that indicates if the user can skip providing a value for this attribute. */
  is_optional: boolean;

  /** @description The value of the attribute. The user-provided or default value for this attribute. */
  value: (string | null);

  /** @description The type of the attribute. E.g. BankAccountNumber, PhoneNumber, EmailAddress, etc. */
  type: (string | null);

  /** @description The expected value of the attribute. A hint or example of what kind of value is expected for this attribute. */
  expected_value: (string | null);

  /** @description Whether this is the last attribute value used or not. A boolean value that indicates if this attribute value was used in the previous request or not. */
  last_attr_value_used: boolean;
}