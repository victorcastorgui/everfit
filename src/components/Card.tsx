import { ReactNode } from "react";

function Card({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-black text-white rounded-[0.5rem] w-[15rem] h-[10rem] p-[1rem] flex flex-col gap-[1rem] justify-center">
      <h3 className="text-[1.5rem]">{title}</h3>
      <p className="text-[2rem]">{children}</p>
    </div>
  );
}

export default Card;
