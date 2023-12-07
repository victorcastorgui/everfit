import { useState } from "react";

interface UseFetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | unknown;
  fetchData: (url: string, options: RequestInit | undefined) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export const useFetch = <T>(): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (url: string, options: RequestInit | undefined) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError(new Error("There is SyntaxError"));
      } else {
        setError(error as Error);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, setData };
};
