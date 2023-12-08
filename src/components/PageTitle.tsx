import React from "react";

function PageTitle({ children }: { children: string }) {
  return <h3 className="text-[2rem] mt-[2rem]">{children}</h3>;
}

export default PageTitle;
