import { User } from "@/types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function CurrentPlan({
  data,
  plan,
  discount,
  setMembership,
  setCurrentMembership,
}: {
  data: User;
  plan: string;
  discount: string;
  setMembership: Dispatch<SetStateAction<string | undefined>>;
  setCurrentMembership: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentPlan, setCurrentPlan] = useState(false);
  useEffect(() => {
    if (data.membership === plan) {
      setCurrentPlan(true);
    }
  }, []);

  const handleMembership = () => {
    setMembership(plan);
    setCurrentMembership(false);
  };

  return (
    <>
      {currentPlan ? (
        <div
          onClick={() => setCurrentMembership(true)}
          className="bg-white border-[2px] border-black rounded-[0.5rem] p-[1rem] text-center cursor-pointer disabled:cursor-not-allowed"
        >
          <h2 className="text-red-500">Your Plan</h2>
          <h3 className="text-[1.5rem]">{plan.toUpperCase()}</h3>
          <p className="mt-[1rem]">Get {discount}% Discount</p>
          <p className="mt-[1rem]">In all of your purchase</p>
        </div>
      ) : (
        <div
          onClick={handleMembership}
          className="bg-black rounded-[0.5rem] p-[1rem] text-center text-white cursor-pointer disabled:cursor-not-allowed"
        >
          <h3 className="text-[1.5rem]">{plan.toUpperCase()}</h3>
          <p className="mt-[1rem]">Get {discount}% Discount</p>
          <p className="mt-[1rem]">In all of your purchase</p>
        </div>
      )}
    </>
  );
}

export default CurrentPlan;
