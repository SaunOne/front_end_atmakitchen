import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { editAlamat, editProfile } from "@/validations/validation";
import { GlobalContext } from '@/context/global_context';
import { GetUserProfile, UpdateProfile } from "@/api/customersApi";
import { GetUserAlamat, GetAlamatById, UpdateAlamat } from "@/api/alamatApi";
import { useParams } from "react-router-dom";


export const FormEditAlamat = () => {
    const { id } = useParams();
    const { user } = useContext(GlobalContext);
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();
    const [picture, setPicture] = useState(null);
    const img = useRef();
    const [data, setData] = useState({});
    const {setSuccess, success} = useContext(GlobalContext);

    console.log(user);

    useEffect(() => {
        GetAlamatById(id) 
            .then((response) => {
            setData(response);
            console.log(response);
            })
            .catch((err) => {
            console.error(err);
            });
    }, [id]);

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
            parsedAlamat.data.id_alamat = id;
            UpdateAlamat(parsedAlamat.data)
              .then((response) => {
                console.log(response); 
                setSuccess({bool: true, message: 'Alamat berhasil diupdate'});
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
                    <div className="md:flex  justify-start gap-5">
                        <label className="text-gray-800 font-semibold w-[150px]">Provinsi</label>
                        <input
                            name="provinsi"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={data.provinsi}
                        />
                    </div>
                    {formErrors.provinsi && (
                        <p className="text-red-600 font-medium">
                            {formErrors.provinsi}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Kabupaten</label>
                        <input
                            name="kabupaten"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={data.kabupaten}
                        />

                    </div>
                    {formErrors.kabupaten && (
                        <p className="text-red-600 font-medium">
                            {formErrors.kabupaten}
                        </p>
                    )}
                    <div className="md:flex justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Kecamatan</label>
                        <input
                            name="kecamatan"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={data.kecamatan}

                        />

                    </div>
                    {formErrors.kecamatan && (
                        <p className="text-red-600 font-medium">
                            {formErrors.kecamatan}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Kelurahan</label>
                        <input
                            name="kelurahan"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={data.kelurahan}

                        />
                    </div>
                    {formErrors.kelurahan && (
                        <p className="text-red-600 font-medium">
                            {formErrors.kelurahan}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Detail Alamat</label>
                        <textarea
                            name="detail_alamat"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px] h-[100px]"
                            defaultValue={data.detail_alamat}
                        />
                    </div>
                    <div className="md:flex justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Kode Pos</label>
                        <input
                            name="kode_pos"
                            type="number"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={data.kode_pos}
                        />
                    </div>
                    {formErrors.kode_pos && (
                        <p className="text-red-600 font-medium">
                            {formErrors.kode_pos}
                        </p>
                    )}
                </div>
            </div>
            <div className=" flex justify-end mb-2">
                <button type="submit" className="bg-brown-400 text-white px-5 py-2 rounded-lg">
                    Update
                </button>
            </div>
        </form>
    </>
}