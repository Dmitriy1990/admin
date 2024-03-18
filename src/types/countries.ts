export interface Text {
  safeId: string;
  languageCode: string;
  text: string;
  fd: Date;
  td: Date;
}

export interface Countries {
  id: any;
  code: string;
  phoneCode: string;
  phoneLength: number;
  order: number;
  textId: any;
  text: Text;
  phoneFmt: string;
}
