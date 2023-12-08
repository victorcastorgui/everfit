/* eslint-disable @next/next/no-img-element */
import { getCookie } from "@/utils/CheckCookie";
import Link from "next/link";
import { useRef } from "react";
import Logo from "./Logo";

function Navbar() {
  let cookieExists = "";
  useRef(() => {
    cookieExists = getCookie("token");
  });
  return (
    <div className="bg-black py-3">
      <div className="flex justify-between w-[85%] m-auto">
        <Logo />
        <ul className="flex gap-[2.5rem] items-center text-white">
          <Link href="/home">Home</Link>
          <Link href="/events">Events</Link>
          {cookieExists != "" ? (
            <>
              <button>Login</button>
              <button>Sign Up</button>
            </>
          ) : (
            <>
              <Link href="/bookmarks">Bookmarks</Link>
              <Link href="/purchasehistory">Purchase History</Link>
              <div>
                <img src="/images/defaultAvatar.png" alt="avatar" />
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
