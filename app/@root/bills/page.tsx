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
import { cn } from "@/lib/utils";

const Page = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const initialPage = parseInt(searchParams.get("page") || "1");
   const phoneNumber = searchParams.get("phoneNumber") || null;
   const { nextPage, prevPage, setPage, current } = usePagination(initialPage);

   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const params = new URLSearchParams(searchParams);
      const inputValue = (
         form.elements.namedItem("searchInput") as HTMLInputElement
      )?.value;

      params.set("phoneNumber", inputValue);
      setPage(1);

      router.replace(`?${params.toString()}`);
      console.log("Search term:", current);
   };

   useEffect(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(current));
      router.replace(`?${params.toString()}`);
   }, [current, router, searchParams]);

   const { data, isLoading, error } = useSWR([current, phoneNumber], () =>
      searchBill({
         current: current,
         phoneNumber: phoneNumber ? parseInt(phoneNumber) : undefined,
      }),
   );

   return (
      <div className="w-full py-5 flex flex-col gap-5">
         <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
         >
            <Input
               name="searchInput"
               type="text"
               placeholder="Search by phone number"
            />
            <Button type="submit">Search</Button>
         </form>
         {isLoading && !error && <h1>...Loading</h1>}
         {data && (
            <div className="flex flex-col gap-5">
               <div className="rounded-md border">
                  <DataTable columns={BillColumns} data={data.content} />
               </div>
               <Pagination className="w-fit ml-auto mr-0">
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={prevPage}
                           className={cn("cursor-pointer", {
                              "pointer-events-none": current === 1,
                           })}
                        />
                     </PaginationItem>
                     {Array.from({ length: data.totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                           <PaginationLink
                              className={cn("cursor-pointer", {
                                 "pointer-events-none": current === index + 1,
                              })}
                              isActive={index + 1 === current}
                              onClick={() => setPage(index + 1)}
                           >
                              {index + 1}
                           </PaginationLink>
                        </PaginationItem>
                     ))}

                     <PaginationItem>
                        <PaginationNext
                           onClick={nextPage}
                           className={cn("cursor-pointer", {
                              "pointer-events-none":
                                 current === data.totalPages,
                           })}
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>
         )}
      </div>
   );
};

export default Page;
