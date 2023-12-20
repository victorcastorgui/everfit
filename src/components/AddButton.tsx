import { ReactNode } from "react";

function AddButton({
  children,
  handleFunction,
}: {
  children: ReactNode;
  handleFunction: () => void;
}) {
  return (
    <div className="w-[90%] flex justify-end">
      <button
        onClick={handleFunction}
        className="flex justify-center items-center border-[2px] bg-black text-white hover:bg-white border-black hover:text-black rounded-[0.5rem] w-24 h-10"
      >
        {children}
      </button>
    </div>
  );
}

export default AddButton;
