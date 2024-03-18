export default interface TextModel {
  /** @description Entity safe id. */
  readonly safeId: (string | null);

  /** @description Text language code according to ISO 639-1 codes. */
  languageCode: (string | null);

  /** @description Text value. */
  text: (string | null);

  /** @description Text version start time. */
  fd: string;

  /** @description Text version end time. */
  td: string;
}