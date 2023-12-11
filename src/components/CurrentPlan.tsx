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
          className="bg-white border-[2px] border-black rounded-[0.5rem] p-[1rem] text-center"
        >
          <h2 className="text-red-600">Your Current Plan</h2>
          <h3>{plan.toUpperCase()}</h3>
          <p>Get {discount} Discount</p>
          <p>In all of your purchase</p>
        </div>
      ) : (
        <div
          onClick={handleMembership}
          className="bg-black rounded-[0.5rem] p-[1rem] text-center text-white"
        >
          <h3>{plan.toUpperCase()}</h3>
          <p>Get {discount} Discount</p>
          <p>In all of your purchase</p>
        </div>
      )}
    </>
  );
}

export default CurrentPlan;
