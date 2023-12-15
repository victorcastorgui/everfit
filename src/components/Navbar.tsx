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
  const [navbar, setNavbar] = useState(false);
  const id = Cookie.get("id");
  const redirectProfile = () => {
    router.push("/profile");
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR(`${API_URL}/users/${id}`, fetcher);

  const handleNavbarDisplay = () => {
    setNavbar(!navbar);
  };
  useEffect(() => {
    if (tokenExists) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-black py-3">
      <div className="flex justify-between items-center w-[85%] m-auto">
        <Logo />
        <button
          onClick={handleNavbarDisplay}
          className="min-[801px]:hidden p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          {navbar ? (
            <img src="/icons/menuclose.svg" alt="navbar menu close" />
          ) : (
            <img src="/icons/menuopen.svg" alt="navbar menu open" />
          )}
        </button>
        <ul className="max-[800px]:hidden flex gap-[2.5rem] items-center text-white">
          <Link href="/home">Home</Link>
          <Link href="/events">Events</Link>
          {isLoggedIn ? (
            <>
              <Link href="/bookmarks">Bookmarks</Link>
              <Link href="/history">Purchase History</Link>
              <div
                className="rounded-full h-[2.5rem] w-[2.5rem] flex justify-center object-cover cursor-pointer"
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
      <div
        className={`${
          navbar ? "" : "hidden"
        } min-[800px]:hidden bg-black w-full z-[10] absolute`}
      >
        <ul className="flex flex-col gap-[2.5rem] bg-black w-[85%] m-auto items-start mt-[1rem] mb-[1rem] text-white">
          <Link onClick={handleNavbarDisplay} href="/home">
            Home
          </Link>
          <Link onClick={handleNavbarDisplay} href="/events">
            Events
          </Link>
          {isLoggedIn ? (
            <>
              <Link onClick={handleNavbarDisplay} href="/bookmarks">
                Bookmarks
              </Link>
              <Link onClick={handleNavbarDisplay} href="/history">
                Purchase History
              </Link>
              <div
                className="rounded-full h-[2.5rem] w-[2.5rem] flex justify-center object-cover"
                onClick={() => {
                  redirectProfile();
                  handleNavbarDisplay();
                }}
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
    </nav>
  );
}

export default Navbar;
