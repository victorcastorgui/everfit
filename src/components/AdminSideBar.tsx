import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Logo from "./Logo";

function AdminSideBar({
  setIsAdmin,
}: {
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}) {
  const { push } = useRouter();
  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("id");
    Cookies.remove("token");
    setIsAdmin(false);
    push("/auth/login");
  };

  return (
    <nav className=" bg-black min-w-[11rem] text-white h-screen flex flex-col w-[15%] z-40 justify-between items-center p-8 fixed">
      <Logo />
      <div className="flex flex-col gap-8">
        <Link className="hover:text-gray-500" href="/dashboard">
          Dashboard
        </Link>
        <Link className="hover:text-gray-500" href="/manageEvents">
          Manage Events
        </Link>
        <Link className="hover:text-gray-500" href="/manageMerch">
          Merchandise
        </Link>
        <Link className="hover:text-gray-500" href="/users">
          Users
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="border-[2px] border-white rounded-[0.5rem] h-12 w-20 hover:bg-white hover:text-black"
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminSideBar;
