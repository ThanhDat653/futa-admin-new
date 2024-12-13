import { useState } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface IPaginationProps {
   currentPage: number;
}

export default function usePagination(currentPage: number) {
   const [current, setCurrent] = useState<number>(currentPage);

   const nextPage = () => {
      setCurrent((prev) => prev + 1);
   };

   const prevPage = () => {
      setCurrent((prev) => prev - 1);
   };

   const setPage = (page: number) => {
      setCurrent(page);
   };

   return { nextPage, prevPage, setPage, current };
}
