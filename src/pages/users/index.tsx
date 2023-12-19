import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import useSWR from "swr";

function User() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR<User[]>(
    `${API_URL}/users/?role=user`,
    fetcher,
    { refreshInterval: 1000 }
  );
  const { push } = useRouter();
  const { fetchData } = useFetch();
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
        <table className="table-auto border-[2px] border-black rounded-[0.5rem] text-left mt-[2rem]">
          <thead>
            <tr className="border-b border-black bg-black text-white">
              <th className="p-[1rem] w-12">ID</th>
              <th className="p-[1rem] w-60">Name</th>
              <th className="p-[1rem] w-40">Balance</th>
              <th className="p-[1rem] w-40">Membership</th>
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
                <td className="p-[1rem] flex gap-3">
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
