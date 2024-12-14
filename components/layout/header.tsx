"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";

const Header = () => {
   const pathname = usePathname();
   console.log(pathname.split("/")[1]);
   return (
      <div
         className="flex justify-between items-center bg-white shadow border-b z-50 px-10 py-3 fixed"
         style={{ width: `calc(100vw - 256px)` }}
      >
         <h1 className="capitalize text-slate-600 font-medium">
            {pathname.split("/")[1] || "Dashboard"}
         </h1>
         <div className="flex justify-center items-center gap-3 w-fit">
            <Avatar className="size-9">
               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
               <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-start ">
               <h3 className="text-sm text-slate-800">Futa Admin</h3>
               <h3 className="text-xs text-teal-600 ">Online</h3>
            </div>
         </div>
      </div>
   );
};

export default Header;
