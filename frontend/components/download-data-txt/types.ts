import { ILanguage } from "../language-select/types";

export interface IDownloadDataTxtProps {
  data?: Array<string>;
  searchKey: string;
  language: ILanguage;
}
