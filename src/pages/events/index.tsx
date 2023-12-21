/* eslint-disable @next/next/no-img-element */
import BookmarkButton from "@/components/BookmarkButton";
import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import { Event } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { DateTimeFormat } from "@/utils/DateTimeFormat";
import { IDRFormat } from "@/utils/IDRFormat";
import Reveal from "@/utils/Reveal";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<Event[]>(
    `${API_URL}/events?name_like=${search}&${
      category && "category=" + category
    }&${sort && "_sort=" + sort}&${order && "_order=" + order}`,
    fetcher
  );
  const router = useRouter();
  const userId = Cookie.get("id");

  const handleDetail = (id: number) => {
    router.push(`/events/${id}`);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = data?.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="text-center">
        <PageTitle>Events</PageTitle>
      </div>
      <div className="w-[85%] m-auto flex justify-between max-[1000px]:grid max-[1000px]:grid-cols-2 max-[1000px]:gap-x-[1rem]">
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
            <option value="startTime">Date</option>
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
      </div>
      <div className="w-[85%] m-auto mt-[2rem] grid grid-cols-4 max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1 gap-x-[2rem] gap-y-[3rem] ">
        {displayedData?.map((item) => (
          <Reveal key={item.id}>
            <div className="bg-black border-[3px] border-black rounded-[0.5rem] text-white w-[100%] text-center hover:shadow-2xl">
              <div className="h-[15rem] rounded-[0.5rem] object-contain relative">
                <img
                  className="rounded-[0.5rem] h-[100%] w-[100%]"
                  src={item.image}
                  alt="event image"
                />
                <div onClick={(e) => e.stopPropagation}>
                  <BookmarkButton eventId={item.id} userId={userId as string} />
                </div>
              </div>
              <div className="w-[90%] m-auto">
                <h2 className="text-[1.5rem] mt-[1rem]">{item.name}</h2>
                <p className="mt-[0.5rem]">{DateTimeFormat(item.startTime)}</p>
                <p className="mt-[0.5rem]">{IDRFormat.format(item.price)}</p>
                <p className="my-[0.5rem] truncate">{item.description}</p>
                <button
                  className="border-[2px] border-white rounded-[0.5rem] w-20 h-10 mb-2 hover:bg-white hover:text-black"
                  onClick={() => handleDetail(item.id)}
                >
                  Detail
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="flex justify-center mt-8">
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
  );
}

export default Events;
