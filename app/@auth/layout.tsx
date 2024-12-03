"use client"
import React from "react";
import {signIn} from "next-auth/react";

const AuthLayout = () => {

   return (
       <div
           className="text-2xl flex justify-center items-center w-screen h-screen"
       >
           <div onClick={() => signIn('admin')} className="cursor-pointer">Click here to continue !</div>
       </div>
   )
};

export default AuthLayout;
