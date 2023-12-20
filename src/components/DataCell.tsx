import { ReactNode } from "react";

function DataCell({ children }: { children: ReactNode }) {
  return <td className="p-[1rem]">{children}</td>;
}

export default DataCell;
