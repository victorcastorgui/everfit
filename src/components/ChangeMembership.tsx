import { User } from "@/types/types";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import CurrentPlan from "./CurrentPlan";

function ChangeMembership({
  setShowMemberModal,
  data,
}: {
  setShowMemberModal: React.Dispatch<SetStateAction<boolean>>;
  data: User;
}) {
  const [success, setSuccess] = useState(false);
  const handleCloseModal = () => {
    setSuccess(!success);
    setShowMemberModal(false);
  };
  return (
    <div
      onClick={() => setShowMemberModal(false)}
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
          <div>
            <CurrentPlan data={data} plan={"silver"} />
            <CurrentPlan data={data} plan={"gold"} />
            <CurrentPlan data={data} plan={"platinum"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangeMembership;
