export interface Ticket {
   id: string;
   seatName: string;
   price: number;
}

export interface Trip {
   id: string;
   startTime: string; // ISO date string
   endTime: string; // ISO date string
   startAt: string;
   endAt: string;
   regionFromName: string;
   regionToName: string;
   locationFromName: string;
   locationToName: string;
}

export interface BillDetail {
   id: string;
   paymentAt: string; // ISO date string
   expireAt: string; // ISO date string
   totalPrice: number;
   paymentUrl: string;
   failureReason: string;
   failureAt: string; // ISO date string
   failure: boolean;
   passengerName: string;
   passengerPhone: string;
   passengerEmail: string;
   tickets: Ticket[];
   status: string;
   trip: Trip;
   roundTrip: string;
   createDate: string; // ISO date string
}
