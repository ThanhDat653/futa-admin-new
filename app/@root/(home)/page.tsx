import React from "react";
import {BillChart} from "@/components/dashboard/bill-chart";
import {getPopularTrips} from "@/service/dashboard";
import PopularRoute from "@/components/dashboard/popular-trips";

const Page = async () => {

    const popularTrips = await getPopularTrips();
   return (
       <div className="w-full min-h-screen p-6">
           <div className="flex justify-between space-x-4 w-full overflow-hidden rounded-xl mb-6">
               <div className="relative w-1/3 overflow-hidden rounded-xl">
                   <img src={`https://trip.s3-hcm-r1.s3cloud.vn/landing/ho-chi-minh.png`}
                        alt="Thành phố Hồ Chí Minh"/>
                   <div className="absolute inset-0 bg-black opacity-20"></div>
                   <div className="absolute bottom-3 left-3 text-white">
                       {/*<h3>Tuyến xe từ</h3>*/}
                       <h1 className="font-semibold uppercase">Thành phố Hồ Chí Minh</h1>
                   </div>
               </div>
               <div className="relative w-1/3 overflow-hidden rounded-xl">
                   <img src={`https://trip.s3-hcm-r1.s3cloud.vn/landing/da-nang.png`}
                        alt="Thành phố Hồ Chí Minh"/>
                   <div className="absolute inset-0 bg-black opacity-20"></div>
                   <div className="absolute bottom-3 left-3 text-white">
                       {/*<h3>Tuyến xe từ</h3>*/}
                       <h1 className="font-semibold uppercase">Đà Nẵng</h1>
                   </div>
               </div>
               <div className="relative w-1/3 overflow-hidden rounded-xl">
                   <img src={`https://trip.s3-hcm-r1.s3cloud.vn/landing/da-lat.png`}
                        alt="Thành phố Hồ Chí Minh"/>
                   <div className="absolute inset-0 bg-black opacity-20"></div>
                   <div className="absolute bottom-3 left-3 text-white">
                       {/*<h3>Tuyến xe từ</h3>*/}
                       <h1 className="font-semibold uppercase">Đà lạt</h1>
                   </div>
               </div>
           </div>
           <div className="flex justify-between item-center space-x-8">
               <div className="w-3/5 h-1/2">
                   <BillChart/>
               </div>
               <div className="w-2/5">
                   <PopularRoute data={popularTrips}/>
               </div>
           </div>
       </div>
   );
};

export default Page;
