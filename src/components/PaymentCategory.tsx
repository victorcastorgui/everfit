import React from "react";

const PaymentCategory = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-[1.5rem] text-center">{children}</h3>;
};

export default PaymentCategory;
