import { User } from "@/types/types";
import { fetcher } from "@/utils/Fetcher";
import useSWR from "swr";

function useUser(URL: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<User[]>(
    URL,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );
  return {
    data,
    isLoading,
    error,
    isValidating,
    getUser: mutate,
  };
}

export default useUser;
