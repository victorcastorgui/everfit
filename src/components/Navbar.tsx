/* eslint-disable @next/next/no-img-element */
import Cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "./Logo";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tokenExists = Cookie.get("token");
  const redirectProfile = () => {
    router.push("/profile");
  };
  useEffect(() => {
    if (tokenExists != "") {
      setIsLoggedIn(true);
    }
  }, []);
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
              <div onClick={redirectProfile}>
                <img src="/images/defaultAvatar.png" alt="avatar" />
              </div>
            </>
          ) : (
            <>
              <button className="bg-white text-black py-[0.2rem] px-[0.3rem] rounded-[0.5rem]">
                Sign Up
              </button>
              <button className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]">
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
