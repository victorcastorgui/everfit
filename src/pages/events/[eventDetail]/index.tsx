/* eslint-disable @next/next/no-img-element */
import BackPage from "@/components/BackPage";
import PageTitle from "@/components/PageTitle";
import { Purchase } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Reveal from "@/utils/Reveal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

function DetailPage() {
  const { push, query } = useRouter();
  const [participantsCount, setParticipantsCount] = useState(0);
  const eventId = query.eventDetail;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`${API_URL}/events/${eventId}`, fetcher);
  const handleBackPage = () => {
    push("/events");
  };
  const { data: participantsData } = useSWR<Purchase[]>(
    `${API_URL}/purchases`,
    fetcher
  );
  const handlePurchase = () => {
    push(`/purchase/${eventId}`);
  };

  useEffect(() => {
    let count = 0;
    participantsData?.forEach((item) => {
      if (item.eventId === parseInt(eventId as string)) {
        count += 1;
      }
    });
    setParticipantsCount(count);
  }, [participantsData, data]);

  const hasError = participantsCount === data?.capacity;

  return (
    <div>
      <div className="flex justify-between items-center w-[85%] m-auto">
        <BackPage props={handleBackPage} />
        <PageTitle>{data?.name}</PageTitle>
        <br />
      </div>
      <div className="bg-black rounded-[0.5rem] mt-[2rem] w-[85%] m-auto p-[1rem]">
        <div className="w-[80%] m-auto text-white">
          <div className="max-[800px]:flex-col max-[800px]:items-center flex justify-between">
            <img
              className="rounded-[0.5rem] w-[50%] max-[800px]:w-[100%]"
              src={data?.image}
              alt="event image"
            />
            <Reveal>
              <div className="max-[800px]:mt-[1rem] max-[600px]:text-[1rem] text-[1.5rem]">
                <p>Start time: {data?.startTime}</p>
                <p>Duration: {data?.duration}</p>
                <p>Category: {data?.category}</p>
                <p>Price: {IDRFormat.format(data?.price)}</p>
                <p>
                  Capacity: {participantsCount}/{data?.capacity}
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="max-[600px]:text-[1rem] mt-[1rem] text-[1.5rem]">
              {data?.description}
            </p>
          </Reveal>
        </div>
      </div>
      <div className="flex w-[85%] m-auto justify-end mt-[2rem]">
        <button
          onClick={handlePurchase}
          className="bg-black rounded-[0.5rem] p-[0.5rem] text-white disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={hasError}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
