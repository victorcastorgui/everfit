import { decrement, increment } from "@/stores/merchandise/merchandiseSlice";
import { RootState } from "@/stores/store";
import { Merch, Purchase } from "@/types/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function QtyButton({
  setPurchaseData,
  purchaseData,
  item,
}: {
  setPurchaseData: Dispatch<SetStateAction<Purchase>>;
  item: Merch;
  purchaseData: Purchase;
}) {
  const qty = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    updatePurchasedData(qty);
  }, [qty]);
  const dispatch = useDispatch();
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
          dispatch(decrement());
        }}
        disabled={qty <= 0}
      >
        -
      </button>
      <p className="text-[1.5rem]">{qty}</p>
      <button
        className="flex justify-center items-center bg-black disabled:bg-gray-500 text-white text-[1.5rem] rounded-[0.5rem] w-8 h-8"
        onClick={() => {
          dispatch(increment());
        }}
        disabled={qty >= item.stock!}
      >
        +
      </button>
    </div>
  );
}

export default QtyButton;
