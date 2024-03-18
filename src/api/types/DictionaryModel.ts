import DictionaryKind from "./DictionaryKind";
import TextModel from "./TextModel";

export default interface DictionaryModel {
  /** @description Dictionary entity safe id. */
  readonly safeId: (string | null);

  kind: DictionaryKind;

  /** @description Dictinoary enitity code. */
  code: (string | null);

  text: TextModel;
}