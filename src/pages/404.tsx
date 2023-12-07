import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Image src="/images/404.png" alt="404 code" width="800" height="600" />
      <p className="text-[2rem]">Uh-Oh...</p>
      <p className="text-[2rem]">
        The page you are looking for may have been moved, deleted, or possibly
        never existed.
      </p>
      <Link
        className="bg-[#f8f8ff] rounded-[0.5rem] text-[black] w-[6rem] h-[3rem] flex items-center justify-center mt-[2rem]"
        href="/"
      >
        Back
      </Link>
    </div>
  );
}
