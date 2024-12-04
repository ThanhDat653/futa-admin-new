"use client";

import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import useSWR from "swr";
import { searchBill } from "@/service/bill";
import { END_POINTS } from "@/constants/endpoint";
import { formatVND } from "@/lib/utils";
import Status, { TBillStatus } from "./status";

export function PaginationDemo() {
   return (
      <Pagination className="w-fit m-0">
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#" isActive>
                  2
               </PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
               <PaginationNext href="#" />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}

export function BillTable() {
   const { data } = useSWR(
      `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.BILL.SEARCH}?tripFrom=2024-11-15 00:00:00&tripTo=2024-11-20 23:59:59`,
      searchBill,
   );

   return (
      <div className="flex flex-col items-end w-full gap-4">
         <Table className="rounded">
            <TableHeader className="bg-slate-200 ">
               <TableRow className="">
                  <TableHead className=" text-slate-900">Name</TableHead>
                  <TableHead className="text-slate-900">Phone</TableHead>
                  <TableHead className="text-slate-900">Departure</TableHead>
                  <TableHead className="text-slate-900">Destination</TableHead>
                  <TableHead className="text-slate-900">Start At</TableHead>
                  <TableHead className="text-slate-900 w-[100px]">
                     Status
                  </TableHead>
                  <TableHead className="text-slate-900 text-right">
                     Price
                  </TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data?.content.map((bill) => (
                  <TableRow key={bill.id}>
                     <TableHead className="text-slate-700 font-normal">
                        {bill.passengerName}
                     </TableHead>
                     <TableHead className="text-slate-700 font-normal">
                        {bill.passengerPhone}
                     </TableHead>
                     <TableHead className="text-slate-700 font-normal">
                        {bill.trip.regionFromName}
                     </TableHead>
                     <TableHead className="text-slate-700 font-normal">
                        {bill.trip.regionToName}
                     </TableHead>
                     <TableHead className="text-slate-700 font-normal">
                        {bill.trip.startTime}
                     </TableHead>
                     <TableHead className="text-slate-700 font-normal w-[100px]">
                        <Status name={bill.status as TBillStatus} />
                     </TableHead>
                     <TableHead className="text-orange-600 font-normal text-right">
                        {formatVND(bill.totalPrice)}
                     </TableHead>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <PaginationDemo />
      </div>
   );
}
