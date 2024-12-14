import React from "react";
import {DataTable} from "@/components/ui/data-table";
import {ScheduleColumns} from "@/app/@root/schedules/column";
import {fetchTransportData} from "@/service/schedule";

const page = async () => {

   const data = await fetchTransportData()
   return (
       <div className="mx-3 my-10 rounded-md border">
          <DataTable columns={ScheduleColumns} data={data} />
       </div>
   )
};

export default page;
