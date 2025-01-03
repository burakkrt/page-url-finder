import React, { useState } from "react";
import { IDownloadDataTxtProps } from "./types";

const DownloadDataTxt: React.FC<IDownloadDataTxtProps> = ({
  data,
  searchKey,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (data) {
      setIsLoading(true);
      const fileContent = data.join("\n");
      const blob = new Blob([fileContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${searchKey || "data-results"}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <button
      type="button"
      className="download-data-txt"
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? "İndirmeye " : "Metin dosyası olarak indir."}
    </button>
  );
};

export default DownloadDataTxt;
