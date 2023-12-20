import Image from "next/image";
import React, { ReactNode } from "react";

function SuccessfulTransaction({
  children,
  handleCloseModal,
}: {
  children: ReactNode;
  handleCloseModal: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        src="/images/success.png"
        width={300}
        height={300}
        alt="success image"
      />
      <h3 className="text-[1.5rem]">{children}</h3>
      <button
        className="bg-black border-[2px] text-white border-black rounded-[0.5rem] hover:bg-white hover:text-black p-4"
        onClick={handleCloseModal}
      >
        Click to close!
      </button>
    </div>
  );
}

export default SuccessfulTransaction;
