import React from "react";
import { IUrlFinderFilterProps } from "./types";
import { IFilterListing, IFormData } from "../page-url-finder/types";

const UrlFinderFilter: React.FC<IUrlFinderFilterProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    key: keyof IFormData,
    value: IFormData[keyof IFormData]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="url-finder-filter">
      <div className="filter-item dropdown">
        <select
          onChange={(e) => handleChange("filterListing", e.target.value)}
          value={formData.filterListing}
        >
          <option value={IFilterListing["all-data"]}>
            Tüm verileri listele
          </option>
          <option value={IFilterListing["external-links"]}>
            Harici linkler
          </option>
          <option value={IFilterListing["internal-links"]}>
            Site içi linkler
          </option>
        </select>
      </div>
      <div className="filter-item">
        <input
          id="is-clickablity"
          type="checkbox"
          checked={formData.isClickablity}
          onChange={(e) => handleChange("isClickablity", e.target.checked)}
        />
        <label htmlFor="is-clickablity">Tıklanabilir özelliğini aç</label>
      </div>
    </div>
  );
};

export default UrlFinderFilter;
