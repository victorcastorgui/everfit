import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import React, { SetStateAction, useEffect, useState } from "react";

function TopUpModal({
  setShowModal,
  data,
}: {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  data: User;
}) {
  const { isLoading, fetchData } = useFetch<User>();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAmountErr, setShowAmountErr] = useState(false);
  const [showPinErr, setShowPinErr] = useState(false);

  useEffect(() => {
    if (parseInt(amount) < 10000 || parseInt(amount) > 10000000) {
      setShowAmountErr(true);
    } else {
      setShowAmountErr(false);
    }
  }, [amount]);

  useEffect(() => {
    if (pin.length === 6) {
      setShowPinErr(false);
    } else {
      setShowPinErr(true);
    }
  }, [pin]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = `${API_URL}/users/${data.id}`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        name: data?.name,
        email: data?.email,
        password: data?.password,
        role: data?.role,
        balance: data?.balance + amount,
        membership: data?.membership,
        image: data.image,
      }),
    };

    fetchData(URL, options);
    console.log("sukses");
    setSuccess(true);
  };

  const hasError = showAmountErr || showPinErr;

  return (
    <div
      onClick={() => setShowModal(false)}
      className="inset-0 w-screen h-screen bg-[#00000040] z-10 absolute flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[69.375rem] p-[2rem] bg-white flex justify-between"
      >
        <form onSubmit={handleSubmit} className="text-black flex flex-col">
          <select name="source">
            <option value="">Source of funds</option>
            <option value="gopay">GoPay</option>
            <option value="virtual account">Virtual Account</option>
            <option value="ovo">OVO</option>
          </select>
          <input
            className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount here..."
          />
          {showAmountErr ? (
            <p className="text-red-700">Minimum: 10000, Maximum: 10000000</p>
          ) : (
            <></>
          )}
          <p className="text-green-500">Current Balance: {data.balance}</p>
          <input
            className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => setPin(e.target.value)}
            type="number"
            placeholder="Enter pin here..."
          />
          {showPinErr ? (
            <p className="text-red-700">Pin must contain 6 digits</p>
          ) : (
            <></>
          )}
          {showAmountErr || showPinErr ? (
            <input
              type="submit"
              value="Top Up"
              disabled={hasError}
              className="bg-gray-600"
            />
          ) : (
            <input type="submit" value="Top Up" className="bg-green" />
          )}
        </form>
      </div>
    </div>
  );
}

export default TopUpModal;
