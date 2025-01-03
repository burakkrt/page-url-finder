import { BASE_FINDER_API_URL } from "./constants";

interface FetchDataProps {
  endpoint: string;
  options?: RequestInit;
}

export const fetchData = async ({ endpoint, options = {} }: FetchDataProps) => {
  try {
    // `fetch` ile API çağrısı yapıyoruz
    const response = await fetch(BASE_FINDER_API_URL + endpoint, options);

    // Response kontrolü
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // JSON dönüşümü
    const data = await response.json();
    return data;
  } catch (error) {
    // Hata işleme
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
