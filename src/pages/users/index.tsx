import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Users() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const { data, getUser } = useUser(
    `${API_URL}/users?role=user&name_like=${search}&${
      sort && "_sort=" + sort
    }&${order && "_order=" + order}`
  );
  const { push } = useRouter();
  const { data: remainingData, fetchData } = useFetch();
  useEffect(() => {
    if (remainingData !== null) {
      getUser();
    }
  }, [remainingData]);
  const handleEditUser = (id: number) => {
    push(`/users/${id}`);
  };

  const handleDeleteUser = (id: number) => {
    const URL = `${API_URL}/users/${id}`;
    const options = {
      method: "DELETE",
    };
    fetchData(URL, options);
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
      <div className="w-[85%] h-fit flex flex-col items-center">
        <PageTitle>Users</PageTitle>
        <div className="flex justify-between items-end w-[90%]">
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
              <option value="balance">Balance</option>
              <option value="membership">Membership</option>
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
              placeholder="Search user name..."
              onChange={(e) => {
                setPage(1);
                setTimeout(() => setSearch(e.target.value), 500);
              }}
              id="search"
            />
          </div>
        </div>
        <table className="w-[90%] table-auto border-[2px] border-black rounded-[0.5rem] text-left mt-[2rem]">
          <thead>
            <tr className="border-b border-black bg-black text-white">
              <th className="p-[1rem]">ID</th>
              <th className="p-[1rem]">Name</th>
              <th className="p-[1rem]">Balance</th>
              <th className="p-[1rem]">Membership</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayedData?.map((item) => (
              <tr className="border-[1px] border-black" key={item.id}>
                <td className="p-[1rem]">{item.id}</td>
                <td className="p-[1rem]">{item.name}</td>
                <td className="p-[1rem]">
                  {IDRFormat.format(item.balance as number)}
                </td>
                <td className="p-[1rem]">{item.membership}</td>
                <td className="p-[1rem] flex justify-center gap-3">
                  <button
                    className="bg-black border-[2px] border-black text-white hover:bg-white hover:text-black rounded-[0.5rem] w-24 h-10"
                    onClick={() => handleEditUser(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(item.id)}
                    className="bg-black border-[2px] border-black text-white hover:bg-white hover:text-black rounded-[0.5rem] w-24 h-10"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}

export default Users;
