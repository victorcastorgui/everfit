/* eslint-disable @next/next/no-img-element */
import { Event, Merch } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Cookies from "js-cookie";
import router from "next/router";
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
  const userId = Cookies.get("id");
  const { data } = useSWR<PurchaseHistory[]>(
    `${API_URL}/purchases?userId=${userId}&&_expand=event`,
    fetcher
  );
  console.log(data);

  const handleDetail = (id: number) => {
    router.push(`/history/${id}`);
  };

  return (
    <div className="w-[85%] m-auto mt-[2rem] min-h-[60vh]">
      <h2 className="text-center text-[2rem]">Purchase History</h2>
      {data?.map((item) => (
        <div
          onClick={() => handleDetail(item.id)}
          className="cursor-pointer bg-black text-white mt-[2rem] max-[600px]:grid-cols-1 grid grid-cols-[2fr_1fr_1fr] rounded-[0.5rem] p-[1rem] text-[1.2rem] items-center place-items-center"
          key={item.id}
        >
          <div className="overflow-hidden object-cover rounded-[0.5rem] h-[100%] w-[100%]">
            <img src={item.event.image} alt="event image" />
          </div>
          <div className="text-center max-[600px]:mt-[1rem]">
            <h3>{item.event.name}</h3>
            <p>{IDRFormat.format(item.event.price)}</p>
          </div>
          <div className="text-center max-[600px]:mt-[1rem]">
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
