import { ReactNode } from "react";

function ErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-red-500 text-[1rem]">{children}</p>;
}

export default ErrorMessage;
