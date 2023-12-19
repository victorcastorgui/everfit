/* eslint-disable @next/next/no-img-element */
import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import { Event } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Bookmark {
  userId: number;
  eventId: number;
  id: number;
  event: Event;
}

function Bookmarks() {
  const [isEmpty, setEmpty] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const id = Cookies.get("id");
  const { push } = useRouter();
  const { data, mutate } = useSWR<Bookmark[]>(
    `${API_URL}/bookmarks/?userId=${id}&&_expand=event`,
    fetcher
  );
  const { data: remainingData, fetchData } = useFetch();

  useEffect(() => {
    if (remainingData !== null) {
      mutate();
    }
  }, [remainingData]);

  const removeBookmark = (bookmarkId: number) => {
    const URL = `${API_URL}/bookmarks/${bookmarkId}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
  };
  const handleDetail = (eventId: number) => {
    push(`/events/${eventId}`);
  };
  return (
    <>
      <div>
        <div className="text-center">
          <PageTitle>Bookmarks</PageTitle>
        </div>
        <div className="w-[85%] m-auto rounded-[0.5rem] mt-[2rem] text-white p-[2rem]">
          {isEmpty ? (
            <p>Bookmarks is empty</p>
          ) : (
            <div className="flex flex-col gap-5">
              {data?.map((item) => (
                <div
                  className="border-[2px] rounded-[0.5rem] bg-black grid p-[1rem] justify-between items-center max-[800px]:gap-8 max-[800px]:grid-cols-1 grid-cols-[2fr_1fr_1fr] gap-10 place-items-center"
                  key={item.id}
                >
                  <div className="rounded-[0.5rem] w-[100%] h-[15rem] object-cover bg-white overflow-hidden">
                    <img
                      className="h-[100%] w-[100%]"
                      src={item.event.image}
                      alt="event image"
                    />
                  </div>
                  <div className="flex flex-col gap-[1rem] text-[1rem] text-center">
                    <p className="text-[1.3rem]">{item.event.name}</p>
                    <p>
                      <b>{IDRFormat.format(item.event.price)}</b>
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <button
                      onClick={() => handleDetail(item.eventId)}
                      className="border-[2px] h-[4rem] border-white rounded-[0.5rem] w-[8rem] hover:bg-white hover:text-black"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => removeBookmark(item.id)}
                      className="border-[2px] h-[4rem] border-white rounded-[0.5rem] w-[8rem] hover:bg-white hover:text-black"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bookmarks;
