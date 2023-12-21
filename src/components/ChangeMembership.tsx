import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { SetStateAction, useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import CurrentPlan from "./CurrentPlan";
import ErrorMessage from "./ErrorMessage";
import SuccessfulTransaction from "./SuccessfulTransaction";

function ChangeMembership({
  setShowMemberModal,
  data,
  getProfile,
}: {
  setShowMemberModal: React.Dispatch<SetStateAction<boolean>>;
  data: User;
  getProfile: KeyedMutator<User>;
}) {
  const [currentMembership, setCurrentMembership] = useState(false);
  const [membership, setMembership] = useState(data?.membership);
  const [balanceError, setBalanceError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [haveMembership, setHaveMembership] = useState(false);
  const { data: updatedData, fetchData } = useFetch<User>();
  const handleCloseModal = () => {
    setSuccess(!success);
    setShowMemberModal(false);
  };

  useEffect(() => {
    if (updatedData !== null) {
      getProfile();
    }
  }, [updatedData]);

  useEffect(() => {
    if (
      data?.membership === "silver" ||
      data?.membership === "gold" ||
      data?.membership === "platinum"
    ) {
      setHaveMembership(true);
    }
  }, []);

  useEffect(() => {
    if (haveMembership) {
      setBalanceError(false);
    } else if (membership === "silver" && (data?.balance as number) < 1000) {
      setBalanceError(true);
    } else if (membership === "gold" && (data?.balance as number) < 5000) {
      setBalanceError(true);
    } else if (membership === "platinum" && (data?.balance as number) < 10000) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  }, [membership]);

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
  const hasError = currentMembership || haveMembership || balanceError;
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
          <SuccessfulTransaction handleCloseModal={handleCloseModal}>
            Change Membership Successful!
          </SuccessfulTransaction>
        ) : (
          <>
            <div className="flex gap-[1rem] justify-between">
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
            {balanceError && (
              <div className="mt-4 flex justify-center">
                <ErrorMessage>Not enough balance</ErrorMessage>
              </div>
            )}
            <div className="flex justify-center mt-8">
              <button
                className="bg-black rounded-[0.5rem] text-white border-[2px] border-black p-4 hover:bg-white hover:text-black disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={handleChangeMembership}
                disabled={hasError}
              >
                Update Membership
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangeMembership;
