import { BillTable } from "@/components/bill/bill-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function InputWithButton() {
   return (
      <div className="flex w-full max-w-sm items-center space-x-2">
         <Input type="text" placeholder="Search by phone number" />
         <Button type="submit">Search</Button>
      </div>
   );
}

const page = () => {
   return (
      <div className="w-full pt-5 flex flex-col gap-5">
         <InputWithButton />
         <BillTable />
      </div>
   );
};

export default page;
