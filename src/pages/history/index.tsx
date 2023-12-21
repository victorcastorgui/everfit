/* eslint-disable @next/next/no-img-element */
import { Event, Merch } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { fetcher } from "@/utils/Fetcher";
import { IDRFormat } from "@/utils/IDRFormat";
import Reveal from "@/utils/Reveal";
import Cookies from "js-cookie";
import router from "next/router";
import { useState } from "react";
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
  const userId = Cookies.get("id");
  const { data } = useSWR<PurchaseHistory[]>(
    `${API_URL}/purchases?userId=${userId}&&_expand=event`,
    fetcher
  );

  const handleDetail = (id: number) => {
    router.push(`/history/${id}`);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = data?.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-[85%] m-auto mt-[2rem] min-h-[60vh]">
      <h2 className="text-center text-[2rem]">Purchase History</h2>
      {displayedData?.map((item) => (
        <Reveal key={item.id}>
          <div
            onClick={() => handleDetail(item.id)}
            className="cursor-pointer bg-black text-white mt-[2rem] max-[600px]:grid-cols-1 grid grid-cols-[2fr_1fr_1fr] rounded-[0.5rem] p-[1rem] text-[1.2rem] items-center place-items-center"
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
        </Reveal>
      ))}
      <div className="flex justify-center mt-8">
        <button
          className="disabled:cursor-not-allowed border-[2px] border-black bg-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className="bg-black border-[2px] border-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
          >
            {index + 1}
          </button>
        ))}
        <button
          className="disabled:cursor-not-allowed  bg-black border-[2px] border-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default History;
