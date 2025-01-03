import React, { Ref, useEffect, useRef, useState } from "react";
import { IFilterListing, IFormData, IPageUrlFinderProps } from "./types";
import { useMutation } from "react-query";
import { fetchData } from "@/utils/functions";
import UrlFinderFilter from "../url-finder-filter";
import DownloadDataTxt from "../download-data-txt";
import { BASE_FINDER_API_URL } from "@/utils/constants";
import classNames from "classnames";

const initialFormDataValue: IFormData = {
  pathname: "",
  isClickablity: false,
  filterListing: IFilterListing["all-data"],
};

const PageUrlFinder: React.FC<IPageUrlFinderProps> = () => {
  const [formData, setFormData] = useState<IFormData>(initialFormDataValue);
  const [localData, setLocalData] = useState<any>(null);
  const inputRef: Ref<HTMLInputElement> | null = useRef(null);

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
    handleChange("filterListing", IFilterListing["all-data"]);
    if (!formData.pathname) {
      setLocalData(null);
      return;
    }
    mutate();
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!formData.pathname) {
      setLocalData(null);
    } else {
      mutate();
    }
  }, [formData.filterListing]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    if (formData.pathname.length === 0) {
      setLocalData(null);
    }
  }, [formData.pathname]);

  return (
    <div className="page-url-finder">
      <h3 className="title">Sayfa içerisinde bağlantıları ara</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Page Pathname"
          className="input-pathname"
          ref={inputRef}
          placeholder={"Sayfa pathname.Örn. izmir, where-to-go..."}
          onChange={(e) => handleChange("pathname", e.target.value)}
          value={formData.pathname}
        />
        <button type="submit" className="button-submit">
          Filtrele
        </button>
      </form>
      <UrlFinderFilter formData={formData} setFormData={setFormData} />

      <div
        className={classNames(
          "content",
          isLoading && "is-loading",
          !isLoading && (!localData || localData.length === 0) && "empty-data"
        )}
      >
        {isLoading && (
          <span className="info-text">
            Veriler işleniyor, lütfen bekleyin...
          </span>
        )}

        {!isLoading && (!localData || localData.length === 0) && (
          <span className="info-text">
            Herhangi bir veri bulunamadı veya bu sayfa mevcut değil.
          </span>
        )}

        {localData &&
          localData?.length > 0 &&
          !isLoading &&
          formData.pathname.length > 0 && (
            <ul className="data-list">
              <div className="data-list-actions">
                <span className="search-url">
                  <a href={localData?.searchUrl} target="_blank">
                    {localData?.searchUrl}
                  </a>{" "}
                  için sonuçları görüntülüyorsun.
                </span>
                <div className="left">
                  <span>Toplam {localData?.length} veri listeleniyor.</span>
                  <DownloadDataTxt
                    data={localData?.data}
                    searchKey={formData.pathname}
                  />
                </div>
              </div>

              {localData?.data?.map((element: string, i: number) => (
                <li key={`data-item-${i}`}>
                  {formData.isClickablity ? (
                    <a href={element} target="_blank">
                      {element}
                    </a>
                  ) : (
                    <span>{element}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default PageUrlFinder;
