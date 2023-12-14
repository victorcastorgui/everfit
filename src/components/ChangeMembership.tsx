import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
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
  const [currentMembership, setCurrentMembership] = useState(false);
  const [membership, setMembership] = useState(data?.membership);
  const [success, setSuccess] = useState(false);
  const { fetchData } = useFetch<User>();
  const handleCloseModal = () => {
    setSuccess(!success);
    setShowMemberModal(false);
  };
  const handleChangeMembership = () => {
    let changeMembership = 0;
    if (membership === "silver") {
      changeMembership = (data?.balance as number) - 1000;
    } else if (membership === "gold") {
      changeMembership = (data?.balance as number) - 5000;
    } else if (membership === "platinum") {
      changeMembership = (data?.balance as number) - 10000;
    }

    const URL = `${API_URL}/users/${data.id}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        balance: changeMembership,
        membership: membership,
      }),
    };

    fetchData(URL, options);
    setSuccess(true);
  };
  const hasError = currentMembership;
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
          <>
            <div className="flex gap-[1rem]">
              <CurrentPlan
                setMembership={setMembership}
                setCurrentMembership={setCurrentMembership}
                data={data}
                plan={"silver"}
                discount={"10%"}
              />
              <CurrentPlan
                setMembership={setMembership}
                setCurrentMembership={setCurrentMembership}
                data={data}
                plan={"gold"}
                discount={"15%"}
              />
              <CurrentPlan
                setMembership={setMembership}
                setCurrentMembership={setCurrentMembership}
                data={data}
                plan={"platinum"}
                discount={"20%"}
              />
            </div>
            <button onClick={handleChangeMembership} disabled={hasError}>
              Update Membership
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangeMembership;
