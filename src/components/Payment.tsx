import { Event, Purchase, User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PaymentCategory from "./PaymentCategory";

const Payment = ({
  purchaseData,
  eventId,
}: {
  purchaseData: Purchase;
  eventId: number;
}) => {
  console.log("payment page", purchaseData);
  const userId = Cookies.get("id");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: eventData } = useSWR<Event>(
    `${API_URL}/events/${eventId}`,
    fetcher
  );
  const { data: userData } = useSWR<User>(
    `${API_URL}/users/${userId}`,
    fetcher
  );
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (userData?.membership === "silver") {
      setDiscount(10);
    } else if (userData?.membership === "gold") {
      setDiscount(15);
    } else if (userData?.membership === "platinum") {
      setDiscount(20);
    }
  }, [userData]);


  return (
    <>
      <div className="w-[85%] m-auto flex gap-[2rem] mt-[2rem] mb-[2rem]">
        <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
          <PaymentCategory>Order Detail</PaymentCategory>
          <div className="flex justify-between">
            <div>
              <p>Class Name</p>
              <p>Ticket Price</p>
              <p>Membership</p>
              <p>Discount</p>
              <p>Merch Quantity</p>
              <p>Total Merch Price</p>
            </div>
            <div>
              <p>{eventData?.name}</p>
              <p>{IDRFormat.format(eventData?.price as number)}</p>
              <p>{userData?.membership?.toUpperCase()}</p>
              <p>{discount}%</p>
              <p>{}</p>
              <p>Total Merch Price</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
          <PaymentCategory>Information</PaymentCategory>
        </div>
      </div>
      <div className="w-[85%] m-auto bg-white rounded-[0.5rem] p-[1.5rem]">
        <PaymentCategory>Payment Method</PaymentCategory>
      </div>
    </>
  );
};

export default Payment;
