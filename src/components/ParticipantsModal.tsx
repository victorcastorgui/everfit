import { Merch, User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { fetcher } from "@/utils/Fetcher";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import DataCell from "./DataCell";

interface Participants {
  userId: number;
  eventId: number;
  purchaseDate: Date;
  merchs: Merch[];
  paymentStatus: boolean;
  paymentTotal: number;
  discount: number;
  user: User;
}

function ParticipantsModal({
  setModal,
  data,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  data: number;
}) {
  const { data: purchaseData } = useSWR<Participants[]>(
    `${API_URL}/purchases?_expand=user&&eventId=${data}`,
    fetcher
  );
  console.log(purchaseData);
  console.log("data", data);
  return (
    <div
      onClick={() => setModal(false)}
      className="inset-0 w-screen h-screen bg-[#00000040] z-10 absolute flex justify-center items-center"
    >
      <div className="w-[15%]"></div>
      <div className="w-[85%]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-[2rem] w-[50%] m-auto h-[45rem] bg-white justify-between rounded-[0.5rem] overflow-auto"
        >
          <h3 className="text-[1.5rem] text-center">Participants</h3>
          <table className="table-auto border-[2px]  border-black rounded-[0.5rem] text-left mt-[2rem] w-full">
            <thead>
              <tr className="border-b border-black bg-black text-white">
                <th className="p-[1rem] w-20">ID</th>
                <th className="p-[1rem] w-30">Name</th>
                <th className="p-[1rem] w-30">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData?.map((item, index) => (
                <tr key={index}>
                  <DataCell>{item.user.id}</DataCell>
                  <DataCell>{item.user.name}</DataCell>
                  <DataCell>Paid</DataCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsModal;
