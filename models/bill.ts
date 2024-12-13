/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IBillStatus {
   name: string;
   id: number;
}

export interface ITripInBill {
   id: string;
   returnId: string | null;
   startTime: string;
   returnTime: string | null;
   regionFromName: string;
   regionToName: string;
   locationFromName: string;
   locationToName: string;
}

export interface IContent {
   id: string;
   paymentAt: string | null;
   expireAt: string;
   totalPrice: number;
   paymentUrl: string;
   passengerName: string;
   passengerPhone: string;
   passengerEmail: string;
   status: string;
   type: string | null;
   trip: ITripInBill;
   createDate: string;
}

export interface ISort {
   direction: "ASC" | "DESC";
   property: string;
   ignoreCase: boolean;
   nullHandling: "NATIVE";
   ascending: boolean;
   descending: boolean;
}

export interface IPageable {
   pageNumber: number;
   pageSize: number;
   sort: ISort[];
   offset: number;
   paged: boolean;
   unpaged: boolean;
}

export interface IBillResponse {
   content: IContent[];
   pageable: IPageable;
   totalPages: number;
   totalElements: number;
   last: boolean;
   size: number;
   number: number;
   sort: ISort[];
   numberOfElements: number;
   first: boolean;
   empty: boolean;
}
