import {
    Card,
    Input,
    //Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { bahanBaku } from "../../../../validations/validation";
import { useNavigate, useParams } from "react-router-dom";
import { pengeluaranBahanTableData } from "@/data";


export function EditPengeluaranBahanBaku() {
    const { id } = useParams();
    const [values, setValues] = useState({});

    const [satuan, setSatuan] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [selectedBahan, setSelectedBahan] = useState("");
    const navigateTo = useNavigate();

    console.log(id);

    useEffect(() => {
        const data = pengeluaranBahanTableData.find(item => item.id === id);
        if (data) {
            setValues({
                nama_bahan: data.nama_bahan,
                jumlah: data.jumlah,
                harga_beli: data.harga_beli,
                satuan: data.satuan
            });
            setSatuan(data.satuan);
        }
        
        console.log(values);
    }, [id]);

    const bahan = [
        {
            id: 1,
            nama_bahan: "Gula",
            satuan: "Kg",
        },
        {
            id: 2,
            nama_bahan: "Garam",
            satuan: "Gram",
        },
    ];

    useEffect(() => {
        const selectedBahanObj = bahan.find((item) => item.nama_bahan === selectedBahan);
        if (selectedBahanObj) {
            setSatuan(selectedBahanObj.satuan);
        }
    }, [selectedBahan]);

    const handleBahanChange = (e) => {
        setSelectedBahan(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedBahanBaku = bahanBaku.safeParse(formDataObject);
        if (!parsedBahanBaku.success) {
            const error = parsedBahanBaku.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);

        } else {
            navigateTo('/mo/pengeluaran-bahan-baku');
        }
        setFormErrors({});
        console.log(formErrors);

    }

    return (
        <Card color="transparent" shadow={false}>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-[50%] max-w-screen-lg ">
                <div className="mb-1 flex flex-col gap-3">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Bahan
                        </Typography>
                        <select
                            name="nama_bahan"
                            size="lg"
                            className=" w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            defaultValue={values.nama_bahan}
                            onChange={handleBahanChange}
                        >
                            <option value="">Pilih Bahan</option>
                            {bahan.map((item) => (
                                <option key={item.id} value={item.nama_bahan} selected={values.nama_bahan === item.nama_bahan ? true : false}>
                                    {item.nama_bahan}
                                </option>
                            ))}
                        </select>

                        {formErrors.nama_bahan && (
                            <p className="text-red-600 font-medium">{formErrors.nama_bahan}</p>
                        )}
                    </div>
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Jumlah
                    </Typography>
                    <Input
                        type="number"
                        name="jumlah"
                        size="lg"
                        placeholder=""
                        className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        defaultValue={values.jumlah}
                    />
                    {formErrors.jumlah && (
                        <p className="text-red-600 font-medium">
                            {formErrors.jumlah}
                        </p>
                    )}

                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Satuan
                        </Typography>
                        <Input
                            type="text"
                            name="satuan"
                            size="lg"
                            placeholder=""
                            className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            readOnly
                            value={satuan}
                            defaultValue={values.satuan}
                        />
                        {formErrors.satuan && (
                            <p className="text-red-600 font-medium">{formErrors.satuan}</p>
                        )}
                    </div>
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Harga Beli
                    </Typography>
                    <Input
                        type="number"
                        name="harga_beli"
                        size="lg"
                        placeholder=""
                        className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        
                        defaultValue={values.harga_beli}
                    />
                    {formErrors.harga_beli && (
                        <p className="text-red-600 font-medium">
                            {formErrors.harga_beli}
                        </p>
                    )}

                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    Save
                </Button>
            </form>
        </Card>
    );
}

export default EditPengeluaranBahanBaku;