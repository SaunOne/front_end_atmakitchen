import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/global_context';
import { FormEditAlamat } from "@/components/userView/profile/formEditAlamat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    const { user } = useContext(GlobalContext);
    console.log(user);

    return (
        <div className="px-8">
            <h1 className="text-gray-800 mt-5 mb-3 font-bold text-[30px]">Edit Alamat</h1>
            <div className="bg-white h-[600px] rounded-[10px] p-6 ">
                <FormEditAlamat />
            </div>
        </div>
    );
}