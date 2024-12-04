import { cn } from "@/lib/utils";
import React from "react";
export type TBillStatus = "Pending" | "Cancel" | "Success";

const Status = ({ name }: { name: TBillStatus }) => {
   return (
      <div
         className={cn("p-[2px] text-center rounded-md", {
            "bg-red-50 text-red-500": name === "Cancel",
            "bg-teal-100 text-teal-600": name === "Success",
            "bg-sky-50 text-sky-500": name === "Pending",
         })}
      >
         <span className="text-xs">{name}</span>
      </div>
   );
};

export default Status;
