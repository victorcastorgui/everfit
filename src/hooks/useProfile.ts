import { fetcher } from "@/utils/Fetcher";
import useSWR from "swr";

function useProfile(URL: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    URL,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );
  return {
    data,
    isLoading,
    error,
    isValidating,
    getProfile: mutate,
  };
}

export default useProfile;
