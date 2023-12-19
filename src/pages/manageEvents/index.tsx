import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import { Event } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import useSWR from "swr";

function ManageEvents() {
  const { push } = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<Event[]>(`${API_URL}/events`, fetcher, {
    refreshInterval: 1000,
  });
  const { fetchData } = useFetch();
  console.log(data);
  const handleDeleteEvent = (id: number) => {
    const URL = `${API_URL}/events/${id}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
  };
  const handleAddEvent = () => {
    push("/manageEvents/addEvent");
  };
  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen flex flex-col items-center">
        <PageTitle>Events</PageTitle>
        <div className="w-[90%] flex justify-end">
          <button
            onClick={handleAddEvent}
            className="flex justify-center items-center border-[2px] bg-black text-white hover:bg-white border-black hover:text-black rounded-[0.5rem] w-24 h-10"
          >
            New Event
          </button>
        </div>
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
                <td className="p-[1rem]">{item.id}</td>
                <td className="p-[1rem]">{item.name}</td>
                <td className="p-[1rem]">{item.startTime}</td>
                <td className="p-[1rem]">{item.duration}</td>
                <td className="p-[1rem]">
                  {IDRFormat.format(item.price as number)}
                </td>
                <td className="p-[1rem]">{item.category}</td>
                <td className="p-[1rem]">{item.capacity}</td>
                <td className="p-[1rem] flex gap-3">
                  <button
                    className="border-[2px] border-black bg-black text-white hover:bg-white hover:text-black rounded-[0.5rem] w-24 h-10"
                    // onClick={() => handleEditEvent(item.id)}
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
