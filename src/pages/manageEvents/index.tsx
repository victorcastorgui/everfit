import AddButton from "@/components/AddButton";
import DataCell from "@/components/DataCell";
import PageTitle from "@/components/PageTitle";
import useEvent from "@/hooks/useEvent";
import { useFetch } from "@/hooks/useFetch";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ManageEvents() {
  const { push } = useRouter();
  const { data, getEvent } = useEvent(`${API_URL}/events`);
  const { data: remainingData, fetchData } = useFetch();
  const handleDeleteEvent = (id: number) => {
    const URL = `${API_URL}/events/${id}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
  };

  useEffect(() => {
    if (remainingData !== null) {
      getEvent();
    }
  }, [remainingData]);

  const handleAddEvent = () => {
    push("/manageEvents/addEvent");
  };

  const handleEditEvent = (id: number) => {
    push(`/manageEvents/${id}`);
  };
  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen flex flex-col items-center">
        <PageTitle>Events</PageTitle>
        <AddButton handleFunction={handleAddEvent}>New Event</AddButton>
        <table className="w-[90%] table-auto border-[2px] border-black rounded-[0.5rem] text-left mt-[2rem]">
          <thead>
            <tr className="border-b border-black bg-black text-white">
              <th className="p-[1rem] w-12">ID</th>
              <th className="p-[1rem] w-60">Name</th>
              <th className="p-[1rem] w-40">Date and Time</th>
              <th className="p-[1rem] w-40">Duration</th>
              <th className="p-[1rem] w-40">Price</th>
              <th className="p-[1rem] w-40">Category</th>
              <th className="p-[1rem] w-40">Capacity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr className="border-[1px] border-black" key={item.id}>
                <DataCell>{item.id}</DataCell>
                <DataCell>{item.name}</DataCell>
                <DataCell>{item.startTime}</DataCell>
                <DataCell>{item.duration}</DataCell>
                <DataCell>{IDRFormat.format(item.price as number)}</DataCell>
                <DataCell>{item.category}</DataCell>
                <DataCell>{item.capacity}</DataCell>
                <td className="p-[1rem] flex gap-3">
                  <button
                    className="border-[2px] border-black bg-black text-white hover:bg-white hover:text-black rounded-[0.5rem] w-24 h-10"
                    onClick={() => handleEditEvent(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(item.id)}
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

export default ManageEvents;
