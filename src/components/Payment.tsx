import { Event, Purchase, User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Reveal from "@/utils/Reveal";
import Cookies from "js-cookie";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import PaymentCategory from "./PaymentCategory";
import PaymentMethod from "./PaymentMethod";

const Payment = ({
  purchaseData,
  eventId,
  setDisable,
  setPurchaseData,
}: {
  purchaseData: Purchase;
  eventId: number;
  setDisable: Dispatch<SetStateAction<boolean>>;
  setPurchaseData: Dispatch<SetStateAction<Purchase>>;
}) => {
  const [showError, setShowError] = useState(false);
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
  const [totalMerchQuantity, setTotalQuantity] = useState(0);
  const [totalMerchPrice, setTotalMerchPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    calculateTotal();

    setGrandTotal(
      (((eventData?.price as number) + totalMerchPrice) * (100 - discount)) /
        100
    );
  }, [eventData]);

  useEffect(() => {
    if (grandTotal) {
      setPurchaseData((prevPurchaseData) => ({
        ...prevPurchaseData,
        paymentTotal: grandTotal,
        discount: discount,
      }));
    }
  }, [grandTotal]);

  const calculateTotal = () => {
    const merchs = purchaseData.merchs;
    let totalMerchQty = 0;
    let totalMerchPrice = 0;

    merchs.forEach((merch) => {
      totalMerchQty += merch.qty;
    });
    setTotalQuantity(totalMerchQty);
    merchs.forEach((merch) => {
      totalMerchPrice += merch.qty * merch.price;
    });
    setTotalMerchPrice(totalMerchPrice);
  };

  useEffect(() => {
    let grandTotal = 0;
    grandTotal =
      (((eventData?.price as number) + totalMerchPrice) * (100 - discount)) /
      100;
    setGrandTotal(grandTotal);
  }, [userData, totalMerchPrice]);

  useEffect(() => {
    if ((userData?.balance as number) < grandTotal) {
      setShowError(true);
    }
  }, [grandTotal, userData]);

  const hasError = showError;
  return (
    <>
      <div className="max-[600px]:flex-col w-[85%] m-auto flex gap-[2rem] mt-[2rem] mb-[2rem]">
        <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
          <PaymentCategory>Order Detail</PaymentCategory>
          <div className="flex justify-between">
            <Reveal>
              <div>
                <p>Class Name</p>
                <p>Ticket Price</p>
                <p>Membership</p>
                <p>Discount</p>
                <p>Merch Quantity</p>
                <p>Total Merch Price</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <p>{eventData?.name}</p>
                <p>{IDRFormat.format(eventData?.price as number)}</p>
                <p>{userData?.membership?.toUpperCase()}</p>
                <p>{discount}%</p>
                <p>{totalMerchQuantity}</p>
                <p>{IDRFormat.format(totalMerchPrice)}</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div>
              <hr />
              <p>Grand Total</p>
              <p>{IDRFormat.format(grandTotal)}</p>
            </div>
          </Reveal>
        </div>
        <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
          <PaymentCategory>Information</PaymentCategory>
          <Reveal>
            <div className="grid grid-cols-2">
              <p>Purchase Date</p>
              <p>{purchaseData.purchaseDate.toString()}</p>
              <p>Items</p>
              <div>
                {purchaseData.merchs.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p>
                      {item.qty} x {item.price}
                    </p>
                  </div>
                ))}
              </div>
              <p>Name</p>
              <p>{userData?.name}</p>
              <p>Email</p>
              <p>{userData?.email}</p>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="w-[85%] m-auto bg-white rounded-[0.5rem] p-[1.5rem] mb-[2rem]">
        <PaymentCategory>Payment Method</PaymentCategory>
        <div className="grid grid-cols-3 max-[600px]:grid-cols-2 max-[400px]:grid-cols-1 place-items-center gap-y-3">
          <div className="flex gap-1">
            <Reveal>
              <input
                onClick={() => {
                  if ((userData?.balance as number) >= grandTotal) {
                    setDisable(false);
                  }
                }}
                type="radio"
                id="balance"
                name="card"
                disabled={hasError}
              />
            </Reveal>
            <Reveal>
              <label className="flex gap-1 items-center" htmlFor="balance">
                <Image
                  src="/icons/wallet.png"
                  alt="wallet icon"
                  width={40}
                  height={40}
                />
                {IDRFormat.format(userData?.balance as number)}
              </label>
            </Reveal>
            {showError ? (
              <p className="text-red-500">
                Balance is not enough, top up first
              </p>
            ) : (
              <></>
            )}
          </div>
          <Reveal>
            <PaymentMethod>visa</PaymentMethod>
          </Reveal>
          <Reveal>
            <PaymentMethod>mastercard</PaymentMethod>
          </Reveal>
          <Reveal>
            <PaymentMethod>paypal</PaymentMethod>
          </Reveal>
          <Reveal>
            <PaymentMethod>stripe</PaymentMethod>
          </Reveal>
          <Reveal>
            <PaymentMethod>discover</PaymentMethod>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Payment;
