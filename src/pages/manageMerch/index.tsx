/* eslint-disable react-hooks/rules-of-hooks */
import AddButton from "@/components/AddButton";
import DataCell from "@/components/DataCell";
import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import useMerch from "@/hooks/useMerch";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { useEffect } from "react";

function manageMerch() {
  const { push } = useRouter();
  const { data, getMerch } = useMerch(`${API_URL}/merchs`);
  const { data: remainingData, fetchData } = useFetch();

  const handleDeleteMerch = (id: number) => {
    const URL = `${API_URL}/merchs/${id}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
  };

  useEffect(() => {
    if (remainingData !== null) {
      getMerch();
    }
  }, [remainingData]);

  const handleEditMerch = (id: number) => {
    push(`/manageMerch/${id}`);
  };

  const handleAddMerch = () => {
    push("/manageMerch/addMerch");
  };

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen flex flex-col items-center">
        <PageTitle>Manage Merchandise</PageTitle>
        <AddButton handleFunction={handleAddMerch}>New Merch</AddButton>
        <table className="w-[90%] table-auto border-[2px] border-black rounded-[0.5rem] text-left mt-[2rem]">
          <thead>
            <tr className="border-b border-black bg-black text-white">
              <th className="p-[1rem]">ID</th>
              <th className="p-[1rem]">Name</th>
              <th className="p-[1rem]">Description</th>
              <th className="p-[1rem]">Price</th>
              <th className="p-[1rem]">E.ID</th>
              <th className="p-[1rem]">Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="border-[1px] border-black" key={index}>
                <DataCell>{item.id}</DataCell>
                <DataCell>{item.name}</DataCell>
                <DataCell>{item.desc}</DataCell>
                <DataCell>{IDRFormat.format(item.price)}</DataCell>
                <DataCell>{item.eventId}</DataCell>
                <DataCell>{item.stock}</DataCell>
                <td className="p-[1rem] flex gap-3">
                  <button
                    className="border-[2px] border-black bg-black text-white hover:bg-white hover:text-black rounded-[0.5rem] w-24 h-10"
                    onClick={() => handleEditMerch(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMerch(item.id)}
                    className="border-[2px] bg-black text-white hover:bg-white border-black hover:text-black rounded-[0.5rem] w-24 h-10"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default manageMerch;
