import { useState } from "react";

function QtyButton({ stock }: { stock: number }) {
  const [qty, setQty] = useState(0);
  return (
    <div className="flex gap-3 justify-center items-center">
      <button
        className="flex justify-center items-center bg-black disabled:bg-gray-500 text-[1.5rem] text-white rounded-[0.5rem] w-8 h-8"
        onClick={() => setQty(qty - 1)}
        disabled={qty <= 0}
      >
        -
      </button>
      <p className="text-[1.5rem]">{qty}</p>
      <button
        className="flex justify-center items-center bg-black disabled:bg-gray-500 text-white text-[1.5rem] rounded-[0.5rem] w-8 h-8"
        onClick={() => setQty(qty + 1)}
        disabled={qty >= stock}
      >
        +
      </button>
    </div>
  );
}

export default QtyButton;
