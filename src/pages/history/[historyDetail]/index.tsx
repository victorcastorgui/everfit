/* eslint-disable @next/next/no-img-element */
// {item.merchs.map((merch) => (
//     <div key={merch.id}>
//       <h4>{merch.name}</h4>
//       <p>
//         <span>{merch.qty}x </span>
//         {IDRFormat.format(merch.price)}
//       </p>
//     </div>
//   ))}
import PageTitle from "@/components/PageTitle";
import { Event, Merch } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
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

function HistoryDetail() {
  const { push, query } = useRouter();
  const orderId = query.historyDetail;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<PurchaseHistory[]>(
    `${API_URL}/purchases/?id=${orderId}&&_expand=event`,
    fetcher
  );
  console.log(data);
  const handleBackPage = () => {
    push("/history");
  };
  return (
    <div>
      <div className="flex justify-between items-center w-[85%] m-auto">
        <p onClick={handleBackPage} className="mt-[2rem]">
          {"< Back"}
        </p>
        <PageTitle>Order Detail</PageTitle>
        <br />
      </div>
      {data?.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-3 bg-black rounded-[0.5rem] w-[85%] m-auto mt-[2rem] text-white mb-[2rem] p-[1rem]"
        >
          <div className="overflow-hidden object-cover rounded-[0.5rem] h-[11rem] w-[19rem]">
            <img src={item.event.image} alt="event image" />
          </div>
          <div>
            <p>{item.event.name}</p>
            <p>{item.event.description}</p>
          </div>
          <div>
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

export default HistoryDetail;
