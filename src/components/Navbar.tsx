/* eslint-disable @next/next/no-img-element */
import { API_URL } from "@/utils/API_URL";
import Cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Logo from "./Logo";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tokenExists = Cookie.get("token");
  const id = Cookie.get("id");
  const redirectProfile = () => {
    router.push("/profile");
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR(`${API_URL}/users/${id}`, fetcher);

  useEffect(() => {
    if (tokenExists) {
      setIsLoggedIn(true);
    }
  }, []);
  console.log(isLoggedIn);

  return (
    <div className="bg-black py-3">
      <div className="flex justify-between w-[85%] m-auto">
        <Logo />
        <ul className="flex gap-[2.5rem] items-center text-white">
          <Link href="/home">Home</Link>
          <Link href="/events">Events</Link>
          {isLoggedIn ? (
            <>
              <Link href="/bookmarks">Bookmarks</Link>
              <Link href="/purchasehistory">Purchase History</Link>
              <div
                className="rounded-full h-[2.5rem] w-[2.5rem] flex justify-center object-cover"
                onClick={redirectProfile}
              >
                <img src={data?.image} alt="user avatar" />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-white text-black py-[0.2rem] px-[0.3rem] rounded-[0.5rem]"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/auth/login")}
                className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
              >
                Login
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
