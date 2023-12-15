import Image from "next/image";
import { ReactNode } from "react";

function PaymentMethod({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-1">
      <input type="radio" id={children as string} name="card" disabled />
      <label htmlFor={children as string}>
        <Image
          src={`/icons/${children}.svg`}
          alt={`${children} icon`}
          width={40}
          height={40}
        />
      </label>
    </div>
  );
}

export default PaymentMethod;
