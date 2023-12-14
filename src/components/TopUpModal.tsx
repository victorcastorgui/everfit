import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";

function TopUpModal({
  setShowTopUpModal,
  data,
}: {
  setShowTopUpModal: React.Dispatch<SetStateAction<boolean>>;
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

  const handleCloseModal = () => {
    setSuccess(!success);
    setShowTopUpModal(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateBalance = (data?.balance as number) + parseInt(amount);
    console.log(updateBalance);

    const URL = `${API_URL}/users/${data.id}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        balance: updateBalance,
      }),
    };

    fetchData(URL, options);
    setSuccess(true);
  };

  const hasError = showAmountErr || showPinErr;

  return (
    <div
      onClick={() => setShowTopUpModal(false)}
      className="inset-0 w-screen h-screen bg-[#00000040] z-10 absolute flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-[2rem] w-[50%] m-auto bg-white justify-between rounded-[0.5rem]"
      >
        {success ? (
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/images/success.png"
              width={300}
              height={300}
              alt="success image"
            />
            <h3>Top Up Successful!</h3>
            <button onClick={handleCloseModal}>Click to close!</button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-black flex flex-col justify-center"
          >
            <label
              htmlFor="countries"
              className="block mb-2 text-lg font-medium text-black"
            >
              Select an option:
            </label>
            <select
              id="source"
              className="border-[2px] h-[3rem] border-black text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
            >
              <option selected>Source of funds</option>
              <option value="gopay">GoPay</option>
              <option value="virtual account">Virtual Account</option>
              <option value="ovo">OVO</option>
            </select>
            <label
              htmlFor="countries"
              className="block mb-2 text-lg font-medium text-black"
            >
              Amount:
            </label>
            <input
              className="px-[1rem] h-[3rem] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none border-black border-[2px] rounded-[0.5rem]"
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
            <label
              htmlFor="countries"
              className="block mb-2 text-lg font-medium text-black"
            >
              Pin:
            </label>
            <input
              className="px-[1rem] h-[3rem] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none  border-black border-[2px] rounded-[0.5rem]"
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
                className="bg-gray-600 text-white rounded-[0.5rem] h-[3rem] mt-3"
              />
            ) : (
              <input
                type="submit"
                value="Top Up"
                className="bg-black text-white rounded-[0.5rem] h-[3rem] mt-3"
              />
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default TopUpModal;
