import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/context';
import { FormEditProfil } from "@/components/userView/profile/formEditProfil";


export default function Page() {
    const { user } = useContext(GlobalContext);
    console.log(user);


    return (
        <div className=" px-8 ">
            <h1 className="text-gray-800 mt-5 mb-3 font-bold text-[30px]">Edit Profil</h1>
            <div className="bg-white h-[480px] rounded-[10px] p-6 ">
                <FormEditProfil />
            </div>
        </div>
    );
}