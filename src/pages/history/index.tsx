/* eslint-disable @next/next/no-img-element */
import { Event, Merch } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import useSWR from "swr";

interface PurchaseHistory {
  id: number;
  userId: number;
  eventId: number;
  purchaseDate: Date;
  merchs: Merch[];
  paymentStatus: boolean;
  paymentTotal: number;
  discount: number;
  event: Event;
}

function History() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<PurchaseHistory[]>(
    `${API_URL}/purchases?userId=3&&_expand=event`,
    fetcher
  );
  console.log(data);

  return (
    <div className="w-[85%] m-auto mt-[2rem]">
      <h2 className="text-center text-[2rem]">Purchase History</h2>
      {data?.map((item) => (
        <div
          className="bg-black text-white mt-[2rem] grid grid-cols-3 rounded-[0.5rem] p-[1rem] text-[1.2rem] items-center place-items-center"
          key={item.id}
        >
          <div className="overflow-hidden object-cover rounded-[0.5rem] h-[11rem] w-[19rem]">
            <img src={item.event.image} alt="event image" />
          </div>
          <div>
            <h3>{item.event.name}</h3>
            <p>{IDRFormat.format(item.event.price)}</p>
            {item.merchs.map((merch) => (
              <div key={merch.id}>
                <h4>{merch.name}</h4>
                <p>
                  <span>{merch.qty}x </span>
                  {IDRFormat.format(merch.price)}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p>Discount: {item.discount}%</p>
            <p>
              Total Price:{" "}
              <span className="text-[1.5rem]">
                {IDRFormat.format(item.paymentTotal)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
