export enum IFilterListing {
  "all-data" = "all-data",
  "external-links" = "external-links",
  "internal-links" = "internal-links",
}

export interface IFormData {
  pathname: string;
  isClickablity: boolean;
  filterListing: IFilterListing;
}

export interface IPageUrlFinderProps {}
