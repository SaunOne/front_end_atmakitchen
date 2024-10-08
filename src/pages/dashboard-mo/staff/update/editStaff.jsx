//import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { staff } from "../../../../validations/validation";
// import { Dashboard } from "@/layouts";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { staffTableData } from "@/data";

export function EditStaff() {
    const { id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({});
    const navigateTo = useNavigate();
    const role = ["Manajer Operasi", "Admin", "Karyawan Biasa"];

    console.log(id);
    useEffect(() => {
        const data = staffTableData.find(item => item.id === id);
        if (data) {
            setValues({
                username: data.username,
                email: data.email,
                nama_lengkap: data.nama_lengkap,
                nama_role: data.nama_role,
                no_telp: data.no_telp,
                gender: data.gender,
                tanggal_lahir: data.tanggal_lahir,
            });
        }
        console.log(values);
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedStaff = staff.safeParse(formDataObject);
        if (!parsedStaff.success) {
            const error = parsedStaff.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);

        } else {
            navigateTo('/mo/staff');
        }
        setFormErrors({});
        console.log(formErrors);
        
    }

    return (
        <Card color="white" shadow={false}>
            <form onSubmit={handleSubmit} className="p-4 mt-8 mb-2 w-full max-w-screen-lg ">
                <div className="mb-1 flex flex-col gap-3">
                    <div className="md:flex justify-start md:gap-[30px]">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Username
                            </Typography>
                            <Input
                                type="text"
                                name="username"
                                size="lg"
                                placeholder=""
                                className=" md:w-[70vh] !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.username}
                            />
                            {formErrors.username && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.username}
                                </p>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Email
                            </Typography>
                            <Input
                                type="email"
                                name="email"
                                size="lg"
                                placeholder=""
                                className=" md:w-[70vh] !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.email}
                            />
                            {formErrors.email && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="md:flex justify-start md:gap-[30px]">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Nama Lengkap
                            </Typography>
                            <Input
                                type="text"
                                name="nama_lengkap"
                                size="lg"
                                placeholder=""
                                className=" md:w-[70vh] w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.nama_lengkap}
                            />
                            {formErrors.nama_lengkap && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.nama_lengkap}
                                </p>
                            )}

                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Jabatan
                            </Typography>
                            <select
                                name="nama_role"
                                size="lg"
                                className=" md:w-[70vh] w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.nama_role}

                            >
                                <option value="">Pilih Jabatan</option>
                                {role.map((item) => (
                                    <option value={item} selected={values.nama_role === item ? true : false}>{item}</option>)
                                )}
                            </select>
                            {formErrors.nama_role && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.nama_role}
                                </p>
                            )}

                        </div>
                    </div>

                    <div className="md:flex justify-start md:gap-[30px]">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Gender
                            </Typography>
                            <select
                                name="gender"
                                className=" md:w-[70vh] w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.gender}

                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki" selected={values.gender === 'Laki-laki' ? true : false}>Laki-laki</option>
                                <option value="Perempuan" selected={values.gender === 'Perempuan' ? true : false}>Perempuan</option>
                            </select>
                            {formErrors.gender && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.gender}
                                </p>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Tanggal Lahir
                            </Typography>
                            <input
                                type="date"
                                name="tanggal_lahir"
                                className=" md:w-[70vh] w-full h-11 border-[#acacac] border-[1px] rounded text-base font-medium outline-none bg-transparent appearance-none text-gray-800 !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                defaultValue={values.tanggal_lahir}
                            />
                            {formErrors.tanggal_lahir && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.tanggal_lahir}
                                </p>
                            )}</div>

                    </div>
                    <Typography variant="h6" color="blue-gray" className="mb-1 mt-2">
                        Nomor Telepon
                    </Typography>
                    <Input
                        type="number"
                        name="no_telp"
                        size="lg"
                        placeholder=""
                        className=" md:w-[70vh] w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        defaultValue={values.no_telp}
                    />
                    {formErrors.no_telp && (
                        <p className="text-red-600 font-medium">
                            {formErrors.no_telp}
                        </p>
                    )}

                    <Button type="submit" className="mt-6" fullWidth>
                        Save
                    </Button>
                </div>
            </form>
        </Card>
    );
}




export default EditStaff;