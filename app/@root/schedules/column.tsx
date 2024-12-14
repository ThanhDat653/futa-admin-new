"use client";

import { ColumnDef } from "@tanstack/react-table";
import {TransportData} from "@/models/schedule";
import {formatVND} from "@/lib/utils";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ScheduleColumns: ColumnDef<TransportData>[] = [
    {
        accessorKey: "regionFrom.name",
        header: "Tuyến xe",
        cell: ({ row }) => {
            const route = row.original.regionFrom.name + " -> " +row.original.regionTo.name;
            return (
                <span className="font-medium">{" "}{route}</span>
            );
        },
    },
    {
        accessorKey: "vehicleTypeName",
        header: "Loại xe",
    },
    {
        accessorKey: "distance",
        header: "Quãng đường",
        cell: ({ row }) => {
            const distance = row.original.distance.toString().split('.')[0];
            return (
                <span className="font-medium">{distance}km</span>
            );
        },
    },
    {
        accessorKey: "duration",
        header: "Thời gian hành trình",
    },
    {
        accessorKey: "price",
        header: "Giá vé",
        cell: ({ row }) => {
            const price = row.original.price;
            return (
                <span className="font-medium text-orange-600">
               {" "}
                    {formatVND(price)}
            </span>
            );
        },
    }
];
