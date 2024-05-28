import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { editAlamat, editProfile } from "@/validations/validation";
import { GlobalContext } from '@/context/context';
import { GetUserProfile, UpdateProfile } from "@/api/customersApi";
import { CreateAlamat } from "@/api/alamatApi";

export const FormAddAlamat = () => {
    const { user } = useContext(GlobalContext);
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();
    const [picture, setPicture] = useState(null);
    const img = useRef();
    const [data, setData] = useState({});
    const {setSuccess, success} = useContext(GlobalContext);

    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedAlamat = editAlamat.safeParse(formDataObject);
        if (!parsedAlamat.success) {
            const error = parsedAlamat.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        } else {
            console.log(parsedAlamat.data);
            CreateAlamat(parsedAlamat.data)
              .then((response) => {
                console.log(response); 
                setSuccess({bool: true, message: 'Alamat Berhasil Dibuat'});
                console.log(success);
                navigateTo('/user/profile/alamat');
            })
            .catch((err) => {
                console.error(err);
            });
        }
        setFormErrors({});
        console.log(formErrors);

    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className="lg:flex justify-start p-4">
                <div className="pr-6">
                    <div className="md:flex justify-start gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Provinsi</label>
                        <input
                            name="provinsi"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                        />
                        {formErrors.provinsi && (
                            <p className="text-red-600 font-medium w-[150px]">
                                {formErrors.provinsi}
                            </p>
                        )}
                    </div>
                    <div className="md:flex justify-start mt-5 gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Kabupaten</label>
                        <input
                            name="kabupaten"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                        />
                        {formErrors.kabupaten && (
                            <p className="text-red-600 font-medium w-[170px]">
                                {formErrors.kabupaten}
                            </p>
                        )}
                    </div>
                    <div className="md:flex justify-start mt-5 gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Kecamatan</label>
                        <input
                            name="kecamatan"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"

                        />
                        {formErrors.kecamatan && (
                            <p className="text-red-600 font-medium w-[180px]">
                                {formErrors.kecamatan}
                            </p>
                        )}
                    </div>
                    <div className="md:flex  justify-start mt-5 gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Kelurahan</label>
                        <input
                            name="kelurahan"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"

                        />
                        {formErrors.kelurahan && (
                            <p className="text-red-600 font-medium w-[180px]">
                                {formErrors.kelurahan}
                            </p>
                        )}
                    </div>
                    <div className="md:flex  justify-start mt-5 gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Detail Alamat</label>
                        <textarea
                            name="detail_alamat"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px] h-[100px]"
                        />
                        {formErrors.detail_alamat && (
                            <p className="text-red-600 font-medium">
                                {formErrors.detail_alamat}
                            </p>
                        )}
                    </div>
                    <div className="md:flex justify-start mt-5 gap-5">
                        <label className="text-gray-800 font-semibold w-[100px]">Kode Pos</label>
                        <input
                            name="kode_pos"
                            type="number"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                        />
                        {formErrors.kode_pos && (
                            <p className="text-red-600 font-medium w-[200px]">
                                {formErrors.kode_pos}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className=" flex justify-end">
                <button type="submit" style={{marginTop: '100px'}} className="bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold uppercase">
                    Save
                </button>
            </div>
        </form>
    </>
}