"use server";
import { END_POINTS } from "@/constants/endpoint";
import { IBillResponse, IBillStatus } from "@/models/bill";
import { cookies } from "next/headers";

// https://api.devsphere.id.vn/api/v1/bills/admin/search?tripFrom=2024-11-15 00:00:00&tripTo=2024-11-20 23:59:59
export const searchBill = async (current: number): Promise<IBillResponse> => {
   const token = cookies().get("access_token")?.value;
   const url = `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.BILL.SEARCH}?tripFrom=2024-11-15 00:00:00&tripTo=2024-11-30 23:59:59&page=${current}`;
   const res = await fetch(url, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const result = await res.json();
   console.log("====================================");
   console.log(result);
   console.log("====================================");
   return result;
};

export const getBillStatus = async (): Promise<IBillStatus> => {
   const token = cookies().get("access_token")?.value;
   const url = `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.BILL.STATUS}?tripFrom=2024-11-15 00:00:00&tripTo=2024-11-20 23:59:59`;
   const res = await fetch(url, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const result = await res.json();

   return result.data;
};
