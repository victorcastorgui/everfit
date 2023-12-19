import { Bookmarks } from "@/types/types";
import { fetcher } from "@/utils/Fetcher";
import useSWR from "swr";

function useBookmark(URL: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Bookmarks[]>(
    URL,
    fetcher,
    { revalidateOnFocus: true }
  );
  return {
    data,
    isLoading,
    error,
    isValidating,
    getBookmark: mutate,
  };
}

export default useBookmark;
