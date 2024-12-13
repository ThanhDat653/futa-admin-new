"use server";
import { END_POINTS } from "@/constants/endpoint";
import { IBillResponse, IBillStatus } from "@/models/bill";
import { cookies } from "next/headers";

interface IBillFilterProps {
   current: number;
   phoneNumber?: number;
   tripFrom?: string;
}

export const searchBill = async ({
   current,
   phoneNumber,
}: IBillFilterProps): Promise<IBillResponse> => {
   const token = cookies().get("access_token")?.value;
   const params = new URLSearchParams({
      tripFrom: "2024-11-15 00:00:00",
      tripTo: "2024-11-30 23:59:59",
      page: current.toString(),
      size: "10",
      phoneNumber: phoneNumber ? phoneNumber.toString() : "",
   });

   const url = `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${
      END_POINTS.BILL.SEARCH
   }?${params.toString()}`;
   const res = await fetch(url, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const result = await res.json();
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
