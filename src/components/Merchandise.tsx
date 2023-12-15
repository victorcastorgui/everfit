import { Merch, Purchase } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import QtyButton from "./QtyButton";

/* eslint-disable @next/next/no-img-element */
function Merchandise({
  purchaseData,
  setPurchaseData,
  eventId,
}: {
  purchaseData: Purchase;
  setPurchaseData: Dispatch<SetStateAction<Purchase>>;
  eventId: number;
}) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<Merch[]>(
    `${API_URL}/merchs?eventId=${eventId}`,
    fetcher
  );
  return (
    <div className="w-[85%] m-auto flex gap-[2rem] mt-[2rem] mb-[2rem]">
      <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
        <h3 className="text-[1.5rem] text-center">Merchandise?</h3>
        <div className="max-[600px]:grid-cols-1 grid grid-cols-2 gap-5 mt-[1rem]">
          {data?.map((item) => (
            <div
              className="overflow-hidden object-cover flex flex-col items-center text-center gap-[0.5rem] border-[2px] border-black rounded-[0.5rem] p-[1rem]"
              key={item.id}
            >
              <img
                className="rounded-[0.5rem] "
                src={item.image}
                alt={item.desc}
              />
              <h3>{IDRFormat.format(item.price)}</h3>
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <QtyButton
                setPurchaseData={setPurchaseData}
                purchaseData={purchaseData}
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Merchandise;
