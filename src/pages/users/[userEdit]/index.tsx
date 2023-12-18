import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

function UserEdit() {
  const { query, push } = useRouter();
  const userId = query.userEdit;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<User>(`${API_URL}/users/${userId}`, fetcher);
  const { fetchData } = useFetch();
  const [userData, setUserData] = useState<User>({
    id: parseInt(userId as string),
    name: "",
    email: "",
    role: "",
    image: "",
    password: "",
    membership: "",
    balance: 0,
  });

  useEffect(() => {
    setUserData(data as User);
  }, [data]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${API_URL}/users/${userId}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
    await fetchData(URL, options);
    push("/users");
  };
  return (
    <div className="flex h-screen">
      <div className="w-[15%]"></div>
      <div className="w-[85%] flex justify-center items-center">
        <div className="flex items-center justify-center bg-black rounded-[0.5rem] text-white p-4">
          <form
            className="flex flex-col text-[1.5rem] gap-4 items-center"
            onSubmit={(e) => {
              handleUpdate(e);
            }}
          >
            <Image
              src={data?.image as string}
              width={200}
              height={200}
              alt="user image"
              priority
            />
            <label htmlFor="name">Name: </label>
            <input
              className="bg-white rounded-[0.5rem] text-black p-2"
              type="text"
              name="name"
              value={userData?.name}
              placeholder="Enter name..."
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <label htmlFor="email">Email: </label>
            <input
              className="bg-white rounded-[0.5rem] text-black p-2"
              type="email"
              name="email"
              value={userData?.email}
              placeholder="Enter email..."
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <label htmlFor="membership">Membership: </label>
            <select
              className="bg-white rounded-[0.5rem] text-black p-2"
              name="membership"
              value={userData?.membership}
              onChange={(e) =>
                setUserData({ ...userData, membership: e.target.value })
              }
            >
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <p>{IDRFormat.format(data?.balance as number)}</p>
            <input
              className="border-[2px] border-white rounded-[0.5rem] h-12 w-28 hover:bg-white hover:text-black"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
