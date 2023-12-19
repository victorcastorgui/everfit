import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { useEffect } from "react";

function User() {
  const { data, getUser } = useUser(`${API_URL}/users?role=user`);
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
  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen flex flex-col items-center">
        <PageTitle>Users</PageTitle>
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
            {data?.map((item) => (
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
      </div>
    </div>
  );
}

export default User;
