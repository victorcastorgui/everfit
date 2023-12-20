import AddButton from "@/components/AddButton";
import DataCell from "@/components/DataCell";
import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import useEvent from "@/hooks/useEvent";
import { useFetch } from "@/hooks/useFetch";
import { API_URL } from "@/utils/API_URL";
import { DateTimeFormat } from "@/utils/DateTimeFormat";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ManageEvents() {
  const { push } = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const { data, getEvent } = useEvent(
    `${API_URL}/events?name_like=${search}&${
      category && "category=" + category
    }&${sort && "_sort=" + sort}&${order && "_order=" + order}`
  );
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = data?.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen flex flex-col items-center">
        <PageTitle>Events</PageTitle>
        <div className="flex justify-between items-end w-[90%]">
          <div>
            <label htmlFor="category">Category:</label>
            <select
              className="w-full bg-white p-4 rounded-[0.5rem]"
              id="category"
              defaultValue=""
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
            >
              <option value={""}>All</option>
              <option value="marathon">Marathon</option>
              <option value="yoga">Yoga</option>
              <option value="cycling">cycling</option>
              <option value="martial art">Martial Art</option>
              <option value="swimming">Swimming</option>
              <option value="sacket sports">Racket Sports</option>
              <option value="football">Football</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort By:</label>
            <select
              className="w-full bg-white p-4 rounded-[0.5rem]"
              id="sort"
              defaultValue=""
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
            >
              <option value={""}>All</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div>
            <label htmlFor="order">Order By:</label>
            <select
              className="w-full bg-white p-4 rounded-[0.5rem]"
              id="order"
              defaultValue=""
              onChange={(e) => {
                setPage(1);
                setOrder(e.target.value);
              }}
            >
              <option value={""}>All</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
          <div>
            <label htmlFor="search">Search:</label>
            <InputForm
              type="text"
              placeholder="Search event name..."
              onChange={(e) => {
                setPage(1);
                setTimeout(() => setSearch(e.target.value), 500);
              }}
              id="search"
            />
          </div>
          <AddButton handleFunction={handleAddEvent}>New Event</AddButton>
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
            {displayedData?.map((item) => (
              <tr className="border-[1px] border-black" key={item.id}>
                <DataCell>{item.id}</DataCell>
                <DataCell>{item.name}</DataCell>
                <DataCell>{DateTimeFormat(item.startTime)}</DataCell>
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
        <div className="flex justify-center mt-8 mb-8">
          <button
            className="disabled:cursor-not-allowed border-[2px] border-black bg-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className="bg-black border-[2px] border-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
            >
              {index + 1}
            </button>
          ))}
          <button
            className="disabled:cursor-not-allowed  bg-black border-[2px] border-black text-white p-[0.5rem] rounded-[0.5rem] hover:bg-white hover:text-black disabled:bg-gray-500"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
