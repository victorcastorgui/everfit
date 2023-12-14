import { Merch, Purchase } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";

function QtyButton({
  setPurchaseData,
  purchaseData,
  item,
}: {
  setPurchaseData: Dispatch<SetStateAction<Purchase>>;
  item: Merch;
  purchaseData: Purchase;
}) {
  const [qty, setQty] = useState(0);
  const updatePurchasedData = (newQty: number) => {
    const updatedMerchs = purchaseData.merchs.map((merch) => {
      if (merch.id === item.id) {
        return { ...merch, qty: newQty };
      }
      return merch;
    });

    const existingMerch = updatedMerchs.find((merch) => merch.id === item.id);

    if (!existingMerch) {
      updatedMerchs.push({
        id: item.id,
        desc: item.desc,
        price: item.price,
        name: item.name,
        image: item.image,
        eventId: item.eventId,
        qty: newQty,
      });
    }
    setPurchaseData((prevData) => ({
      ...prevData,
      merchs: updatedMerchs,
    }));
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      <button
        className="flex justify-center items-center bg-black disabled:bg-gray-500 text-[1.5rem] text-white rounded-[0.5rem] w-8 h-8"
        onClick={() => {
          const newQty = qty - 1;
          setQty(newQty);
          updatePurchasedData(newQty);
        }}
        disabled={qty <= 0}
      >
        -
      </button>
      <p className="text-[1.5rem]">{qty}</p>
      <button
        className="flex justify-center items-center bg-black disabled:bg-gray-500 text-white text-[1.5rem] rounded-[0.5rem] w-8 h-8"
        onClick={() => {
          const newQty = qty + 1;
          setQty(newQty);
          updatePurchasedData(newQty);
        }}
        disabled={qty >= item.stock!}
      >
        +
      </button>
    </div>
  );
}

export default QtyButton;
