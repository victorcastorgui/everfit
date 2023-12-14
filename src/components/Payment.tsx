import { Event, Purchase, User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import PaymentCategory from "./PaymentCategory";

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
  console.log(grandTotal);

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
    merchs.forEach((merch) => {
      totalMerchPrice += merch.price;
    });
    setTotalQuantity(totalMerchQty);
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
              <p>{totalMerchQuantity}</p>
              <p>{IDRFormat.format(totalMerchPrice)}</p>
            </div>
          </div>
          <div>
            <hr />
            <p>Grand Total</p>
            <p>{IDRFormat.format(grandTotal)}</p>
          </div>
        </div>
        <div className="bg-white w-full rounded-[0.5rem] p-[1.5rem]">
          <PaymentCategory>Information</PaymentCategory>
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
        </div>
      </div>
      <div className="w-[85%] m-auto bg-white rounded-[0.5rem] p-[1.5rem] mb-[2rem]">
        <PaymentCategory>Payment Method</PaymentCategory>
        <div>
          <div>
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
            <label htmlFor="balance">Your balance: {userData?.balance}</label>
            {showError ? (
              <p className="text-red-500">
                Balance is not enough, top up first
              </p>
            ) : (
              <></>
            )}
          </div>
          <input type="radio" id="visa" name="card" disabled />
          <label htmlFor="visa">Visa</label>
          <input type="radio" id="mastercard" name="card" disabled />
          <label htmlFor="mastercard">Mastercard</label>
          <input type="radio" id="jago" name="card" disabled />
          <label htmlFor="jago">Jago</label>
        </div>
      </div>
    </>
  );
};

export default Payment;
