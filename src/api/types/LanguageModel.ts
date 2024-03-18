import TextModel from "./TextModel";

export default interface LanguageModel {
  /** @description Language dictionary entoty id. */
  id: (number | null);

  /** @description Language code in ISO 639-1. */
  code: (string | null);

  /** @description Language name text id. */
  textId: number;

  text: TextModel;
}