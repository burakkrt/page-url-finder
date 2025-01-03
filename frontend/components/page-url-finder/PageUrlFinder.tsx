import React, { useEffect, useState } from "react";
import { IFilterListing, IFormData, IPageUrlFinderProps } from "./types";
import { useMutation } from "react-query";
import { fetchData } from "@/utils/functions";
import UrlFinderFilter from "../url-finder-filter";
import DownloadDataTxt from "../download-data-txt";
import { BASE_FINDER_API_URL } from "@/utils/constants";

const initialFormDataValue: IFormData = {
  pathname: "",
  isClickablity: false,
  filterListing: IFilterListing["all-data"],
};

const PageUrlFinder: React.FC<IPageUrlFinderProps> = () => {
  const [formData, setFormData] = useState<IFormData>(initialFormDataValue);

  const handleChange = (
    key: keyof IFormData,
    value: IFormData[keyof IFormData]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { mutate, data, isLoading, error } = useMutation(async () =>
    fetchData({
      endpoint: `/scrape-links?pagePath=${formData.pathname}&linkType=${formData.filterListing}`,
    })
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formData.pathname) {
      mutate();
    }
  };

  useEffect(() => {
    mutate();
  }, [formData.filterListing]);

  return (
    <div className="page-url-finder">
      <h3 className="title">Sayfa içerisinde bağlantıları ara</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Page Pathname"
          className="input-pathname"
          placeholder={"Sayfa pathname.Örn. izmir, where-to-go..."}
          onChange={(e) => handleChange("pathname", e.target.value)}
          value={formData.pathname}
        />
        <button type="submit" className="button-submit">
          Filtrele
        </button>
      </form>
      {}

      <div className="content">
        {isLoading && (
          <span className="loading">Veriler işleniyor, lütfen bekleyin...</span>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <span className="empty-data">
            Herhangi bir veri bulunamadı veya bu sayfa mevcut değil.
          </span>
        )}

        {data && data?.length > 0 && (
          <>
            <UrlFinderFilter formData={formData} setFormData={setFormData} />
            <ul className="data-list">
              <div className="data-list-actions">
                <span className="info">
                  Toplam {data?.length} veri listeleniyor.
                </span>
                <DownloadDataTxt
                  data={data?.data}
                  searchKey={formData.pathname}
                />
              </div>

              {data?.data?.map((element: string, i: number) => (
                <li key={`data-item-${i}`}>
                  {formData.isClickablity ? (
                    <a href={element} target="_blank">
                      {element}
                    </a>
                  ) : (
                    element
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PageUrlFinder;
