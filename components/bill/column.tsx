"use client";

import { IContent } from "@/models/bill";
import { ColumnDef } from "@tanstack/react-table";
import Status, { TBillStatus } from "./status";
import { Fragment } from "react";
import { formatDateTime, formatVND } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const BillColumns: ColumnDef<IContent>[] = [
   {
      accessorKey: "passengerName",
      header: "Name",
   },
   {
      accessorKey: "passengerPhone",
      header: "Phone",
   },
   {
      accessorKey: "trip.regionFromName",
      header: "Departure",
   },
   {
      accessorKey: "trip.regionToName",
      header: "Destination",
   },
   {
      accessorKey: "trip.startTime",
      header: "Start At",
      cell: ({ row }) => {
         const startTime = row.original.trip.startTime;

         return <>{formatDateTime(startTime)}</>;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.original.status;

         return <Status name={status as TBillStatus} />;
      },
   },
   {
      accessorKey: "totalPrice",
      header: "Price",
      cell: ({ row }) => {
         const price = row.original.totalPrice;
         return (
            <span className="font-medium text-orange-600">
               {" "}
               {formatVND(price)}
            </span>
         );
      },
   },
];
