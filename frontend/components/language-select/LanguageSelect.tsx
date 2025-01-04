import React from "react";
import { ILanguage, ILanguageSelectProps } from "./types";

export const languages: Array<ILanguage> = [
  { value: "en-us", label: "English", default: true },
  { value: "tr-tr", label: "Türkçe" },
  { value: "ar-sa", label: "Arabic" },
  { value: "de-de", label: "German" },
];

const LanguageSelect: React.FC<ILanguageSelectProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: any) => {
    const selectedLang = languages.find(
      (lang) => lang.value === e.target.value
    );

    if (selectedLang) {
      setFormData((prev) => ({
        ...prev,
        searchLanguage: selectedLang,
      }));
    }
  };

  return (
    <select
      className="language-select"
      value={formData.searchLanguage.value}
      onChange={handleChange}
    >
      {languages.map((lang, i) => (
        <option key={`language-item-${i}`} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
