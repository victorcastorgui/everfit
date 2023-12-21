/* eslint-disable @next/next/no-img-element */
import useBookmark from "@/hooks/useBookmark";
import { useFetch } from "@/hooks/useFetch";
import { Bookmarks } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function BookmarkButton({
  eventId,
  userId,
}: {
  eventId: number;
  userId: string;
}) {
  const { data: bookmarkEvent, fetchData } = useFetch<Bookmarks>();
  const { data, isLoading, getBookmark } = useBookmark(
    `${API_URL}/bookmarks/?userId=${userId}`
  );

  useEffect(() => {
    if (bookmarkEvent !== null) {
      getBookmark();
    }
  }, [bookmarkEvent]);

  const bookmarkId = data?.find((item) => item.eventId === eventId);

  const [isBookmarked, setIsBookmarked] = useState<boolean>();
  useEffect(() => {
    setIsBookmarked(data?.some((i) => i.eventId === eventId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    toast.success("Bookmark has been added");
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(bookmarkId?.id as number);
    setIsBookmarked(false);
  };

  const deleteBookmark = (bookmarkId: number) => {
    const URL = `${API_URL}/bookmarks/${bookmarkId}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
    toast.success("Bookmark has been deleted");
  };
  return (
    <>
      {isBookmarked ? (
        <button
          className="bg-white rounded-[0.5rem] absolute top-0 left-1"
          onClick={handleDeleteBookmark}
        >
          <img
            className="w-[40px]"
            src="/icons/bookmarked.svg"
            alt="bookmark icon"
          />
        </button>
      ) : (
        <button
          className="bg-white rounded-[0.5rem] absolute top-0 left-1"
          onClick={handleBookmark}
        >
          <img
            className="w-[40px]"
            src="/icons/bookmark.svg"
            alt="bookmark icon"
          />
        </button>
      )}
    </>
  );
}

export default BookmarkButton;
