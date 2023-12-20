import { Merch } from "@/types/types";
import { fetcher } from "@/utils/Fetcher";
import useSWR from "swr";

function useMerch(URL: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Merch[]>(
    URL,
    fetcher,
    { revalidateOnFocus: true }
  );
  return {
    data,
    isLoading,
    error,
    isValidating,
    getMerch: mutate,
  };
}

export default useMerch;
