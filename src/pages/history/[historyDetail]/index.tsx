/* eslint-disable @next/next/no-img-element */
import BackPage from "@/components/BackPage";
import PageTitle from "@/components/PageTitle";
import { Event, Merch } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Reveal from "@/utils/Reveal";
import Cookies from "js-cookie";
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
  const userId = Cookies.get("id");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<PurchaseHistory[]>(
    `${API_URL}/purchases/?id=${orderId}&&_expand=event&&userId=${userId}`,
    fetcher
  );
  const handleBackPage = () => {
    push("/history");
  };
  return (
    <div className="min-h-[65vh]">
      <div className="flex justify-between items-center w-[85%] m-auto">
        <BackPage props={handleBackPage} />
        <PageTitle>Order Detail</PageTitle>
        <br />
      </div>
      {data?.map((item) => (
        <Reveal key={item.id}>
          <div className="max-[800px]:grid-cols-1 grid grid-cols-3 bg-black rounded-[0.5rem] w-[85%] m-auto mt-[2rem] text-white mb-[2rem] p-[1rem] gap-[1rem] items-center">
            <div className="overflow-hidden object-cover rounded-[0.5rem] max-[800px]:h-[100%] h-[11rem] w-[100%]">
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
              <p className="text-end">
                Total Price:{" "}
                <span className="text-[1.5rem]">
                  {IDRFormat.format(item.paymentTotal)}
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default HistoryDetail;
