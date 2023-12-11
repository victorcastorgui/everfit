/* eslint-disable @next/next/no-img-element */
import PageTitle from "@/components/PageTitle";
import { Event } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import useSWR from "swr";

function Event() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR(`${API_URL}/events`, fetcher);
  const router = useRouter();

  const handleDetail = (id: number) => {
    router.push(`/events/${id}`);
  };
  return (
    <div>
      <div className="text-center">
        <PageTitle>Events</PageTitle>
      </div>
      <div className="w-[85%] m-auto mt-[2rem] grid grid-cols-4 gap-x-[2rem] gap-y-[3rem]">
        {data?.map((item: any) => (
          <div
            onClick={() => {
              handleDetail(item.id);
            }}
            className="bg-black border-[3px] border-black rounded-[0.5rem] text-white w-[100%] text-center hover:border-[3px] hover:border-gray-500"
            key={item.key}
          >
            <div className="h-[15rem] rounded-[0.5rem] object-contain">
              <img
                className="rounded-[0.5rem] h-[100%] w-[100%]"
                src={item.image}
                alt="event image"
              />
            </div>
            <div className="w-[90%] m-auto">
              <h2 className="text-[1.5rem] mt-[1rem]">{item.name}</h2>
              <p className="mt-[0.5rem]">{item.startTime}</p>
              <p className="mt-[0.5rem]">{IDRFormat.format(item.price)}</p>
              <p className="my-[0.5rem]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;
