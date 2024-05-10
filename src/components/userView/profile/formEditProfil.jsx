import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile } from "@/validations/validation";
import { GlobalContext } from '@/context/context';

export const FormEditProfil = () => {
    const { user } = useContext(GlobalContext);
   
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();
    const [picture, setPicture] = useState(null);
    const img = useRef();
    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedUser = editProfile.safeParse(formDataObject);
        if (!parsedUser.success) {
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        } else {
            navigateTo('/user/profile');
        }
        setFormErrors({});
        console.log(formErrors);

    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className="lg:flex justify-start p-4">
                <div className="pr-6 lg:border-r-[1px] lg:border-gray-400">
                    <div className="md:flex  justify-start gap-5">
                        <label className="text-gray-800 font-semibold w-[150px]">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={user.username}
                        />
                    </div>
                    {formErrors.username && (
                        <p className="text-red-600 font-medium">
                            {formErrors.username}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Nama Lengkap</label>
                        <input
                            name="nama_lengkap"
                            type="text"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={user.nama_lengkap}

                        />

                    </div>
                    {formErrors.nama_lengkap && (
                        <p className="text-red-600 font-medium">
                            {formErrors.nama_lengkap}
                        </p>
                    )}
                    <div className="md:flex justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={user.email}

                        />

                    </div>
                    {formErrors.email && (
                        <p className="text-red-600 font-medium">
                            {formErrors.email}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 gap-5">
                        <label className="text-gray-800 font-semibold">Nomor Telepon</label>
                        <input
                            name="no_telp"
                            type="number"
                            className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[300px]"
                            defaultValue={user.no_telp}

                        />

                    </div>
                    {formErrors.no_telp && (
                        <p className="text-red-600 font-medium">
                            {formErrors.no_telp}
                        </p>
                    )}
                    <div className="md:flex  justify-between mt-5 pr-14">
                        <label className="text-gray-800 font-semibold">Gender</label>
                        <div className="md:flex ">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="gender"
                                    type="radio"
                                    value="Male"
                                    defaultChecked={user.gender === 'Male'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Laki-laki
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="gender"
                                    type="radio"
                                    value="Female"
                                    defaultChecked={user.gender === 'Female'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full text-gray-800 px-3 py-1.5 text-xs font-medium"
                                >
                                    Perempuan
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex  justify-between mt-5  ">
                        <label className="text-gray-800 font-semibold ">Tanggal Lahir</label>
                        <div className="md:flex gap-2 ">
                            <input
                                name="day"
                                type="number"
                                className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[85px]"
                                placeholder="DD"
                                defaultValue={user.tanggal_lahir.split("-")[2]}
                            />
                            <input
                                name="month"
                                type="number"
                                className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[85px]"
                                placeholder="MM"
                                defaultValue={user.tanggal_lahir.split("-")[1]}
                            />
                            <input
                                name="year"
                                type="number"
                                className="border-2 border-gray-200 text-black rounded-lg px-3 py-1 w-[110px]"
                                placeholder="YYYY"
                                defaultValue={user.tanggal_lahir.split("-")[0]}
                            />
                        </div>
                    </div>
                    {formErrors.day && (
                        <p className="text-red-600 font-medium">
                            {formErrors.day}
                        </p>
                    )}
                    {formErrors.month && (
                        <p className="text-red-600 font-medium">
                            {formErrors.month}
                        </p>
                    )}
                    {formErrors.year && (
                        <p className="text-red-600 font-medium">
                            {formErrors.year}
                        </p>
                    )}
                </div>

                <div className="md:flex md:justify-end w-full">
                    <div>
                        <img src={picture ? picture : user.img} className="w-[150px] h-[150px] rounded-full shadow-md" />
                        <div className="mt-4 flex justify-center px-3 py-1 border-[1px] border-gray-600 text-black cursor-pointer " onClick={() => img.current.click()}>
                            Pilih Gambar
                        </div>
                    </div>

                </div>
            </div>



            <input name="foto_profile" ref={img} type="file" hidden accept="image/*" onChange={(e) => { let pic = URL.createObjectURL(e.target.files[0]); setPicture(pic); }} />
            <div>
                <button type="submit" className="mt-7 bg-black w-full text-white px-5 py-2 rounded-lg">Simpan</button>
            </div>

        </form>
    </>
}