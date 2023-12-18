import AdminSideBar from "@/components/AdminSideBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
});

export default function Layout({ children }: { children: ReactNode }) {
  const role = Cookies.get("role");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, [role]);
  if (router.pathname.includes("/auth/login")) return children;
  if (router.pathname.includes("/auth/signup")) return children;

  if (isAdmin) {
    return (
      <div className={`${lato.className}`}>
        <AdminSideBar setIsAdmin={setIsAdmin} />
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className={`${lato.className}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
