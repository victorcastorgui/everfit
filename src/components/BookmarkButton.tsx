/* eslint-disable @next/next/no-img-element */
import { useFetch } from "@/hooks/useFetch";
import { Bookmarks } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Bookmark {
  userId: number;
  eventId: number;
  id: number;
}

function BookmarkButton({
  eventId,
  userId,
}: {
  eventId: number;
  userId: string;
}) {
  const { fetchData } = useFetch<Bookmarks>();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<Bookmark[]>(
    `${API_URL}/bookmarks/?userId=${userId}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const bookmarkIndex = data?.findIndex((item) => item.eventId === eventId);

  const [isBookmarked, setIsBookmarked] = useState<boolean>();
  useEffect(() => {
    setIsBookmarked(data?.some((i) => i.eventId === eventId));
  }, [isLoading]);
  const handleBookmark = () => {
    addBookmark(eventId);
    setIsBookmarked(true);
  };

  const addBookmark = (id: number) => {
    const URL = `${API_URL}/bookmarks`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: parseInt(userId as string),
        eventId: id,
      }),
    };
    fetchData(URL, options);
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(bookmarkIndex as number);
    setIsBookmarked(false);
  };

  const deleteBookmark = (bookmarkId: number) => {
    const URL = `${API_URL}/bookmarks/${bookmarkId}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
  };
  return (
    <>
      {isBookmarked ? (
        <button
          className="bg-white rounded-[0.5rem] absolute top-0 left-1"
          onClick={handleDeleteBookmark}
        >
          <img src="/icons/bookmarked.svg" alt="bookmark icon" />
        </button>
      ) : (
        <button
          className="bg-white rounded-[0.5rem] absolute top-0 left-1"
          onClick={handleBookmark}
        >
          <img src="/icons/bookmark.svg" alt="bookmark icon" />
        </button>
      )}
    </>
  );
}

export default BookmarkButton;
