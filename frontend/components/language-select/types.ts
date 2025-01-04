import { IFormData } from "../page-url-finder/types";

export interface ILanguage {
  value: string;
  label: string;
  default?: boolean;
}

export interface ILanguageSelectProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}
