import { Event } from "@/types/types";
import { fetcher } from "@/utils/Fetcher";
import useSWR from "swr";

function useEvent(URL: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Event[]>(
    URL,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );
  return {
    data,
    isLoading,
    error,
    isValidating,
    getEvent: mutate,
  };
}

export default useEvent;
