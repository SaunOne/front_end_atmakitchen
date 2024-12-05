import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/global_context';
import TabHistory from "@/components/userView/profile/tab-history";



export default function Page() {
    const { user } = useContext(GlobalContext);
    console.log(user);


    return (
        <div className=" px-8 ">
            <div className="">
                <h1 className="text-gray-800 mt-5 mb-3 font-bold text-[30px]">Withdraw Form</h1>
            </div>
            <div className="bg-white h-[480px] rounded-[10px] p-6 text-black">
                {/* <div>
                    <label for="namaRekening" className="block mb-2">Nama Rekening</label>
                    <input type="text" id="namaRekening" className="p-2 border border-gray-500 rounded-md w-[300px] h-[38px] mb-2" />
                </div>
                <div>
                    <label className="block mb-2">Nomor Rekening</label>
                    <input type="text" className="p-2 border border-gray-500 rounded-md w-[300px] h-[38px]" />
                </div> */}
            </div>
        </div>
    );
}