import { IFormData } from "@/components/page-url-finder/types";

export interface IUrlFinderFilterProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}
