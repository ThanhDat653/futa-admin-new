/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchBill } from "@/service/bill";
import { DataTable } from "@/components/ui/data-table";
import { BillColumns } from "@/components/bill/column";
import useSWR from "swr";
import { END_POINTS } from "@/constants/endpoint";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";
import { useRouter, useSearchParams } from "next/navigation";

export function InputWithButton() {
   return (
      <div className="flex w-full max-w-sm items-center space-x-2">
         <Input type="text" placeholder="Search by phone number" />
         <Button type="submit">Search</Button>
      </div>
   );
}

const Page = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const initialPage = parseInt(searchParams.get("page") || "1");
   const { nextPage, prevPage, setPage, current } = usePagination(initialPage);

   useEffect(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(current));
      router.replace(`?${params.toString()}`);
   }, [current, router, searchParams]);

   const { data, isLoading, error } = useSWR([current], () =>
      searchBill(current),
   );
   console.log(current);

   return (
      <div className="w-full py-5 flex flex-col gap-5">
         <InputWithButton />
         {isLoading && !error && <h1>...Loading</h1>}
         {data && (
            <div className="rounded-md border">
               <DataTable columns={BillColumns} data={data.content} />

               <Pagination className="w-fit m-0">
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious />
                     </PaginationItem>
                     {Array.from({ length: data.totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                           <PaginationLink
                              isActive={index + 1 === current}
                              onClick={() => setPage(index + 1)}
                           >
                              {index + 1}
                           </PaginationLink>
                        </PaginationItem>
                     ))}

                     <PaginationItem>
                        <PaginationNext />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>
         )}
      </div>
   );
};

export default Page;
