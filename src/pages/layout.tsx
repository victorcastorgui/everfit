import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
});

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  if (router.pathname.includes("/auth/login")) return children;
  if (router.pathname.includes("/auth/signup")) return children;

  return (
    <div className={`${lato.className}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
