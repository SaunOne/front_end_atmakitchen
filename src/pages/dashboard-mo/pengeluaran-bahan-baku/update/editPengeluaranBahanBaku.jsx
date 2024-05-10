import {
    Card,
    Input,
    //Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect, useContext } from "react";
import { bahanBaku } from "../../../../validations/validation";
import { useNavigate } from "react-router-dom";
import { GetAllBahanBaku, GetBahanBakuById } from "@/api/bahanBakuApi";
import { GetPengeluaranBahanBakuById, UpdatePengeluaranBahanBaku } from "@/api/pengeluaranBahanBakuApi";
import { GlobalContext } from "@/context/context";
import { useParams } from "react-router-dom";


export function EditPengeluaranBahanBaku() {
    const { setSuccess, success } = useContext(GlobalContext);
    const { id } = useParams();
    const [values, setValues] = useState({});
    const [bahan, setBahan] = useState([]);
    const [satuan, setSatuan] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [selectedBahan, setSelectedBahan] = useState("");
    const navigateTo = useNavigate();

    console.log(id);

    useEffect(() => {
        GetPengeluaranBahanBakuById({ id })
            .then((response) => {
                console.log(response)
                setValues(response);
                GetBahanBakuById(response.id_bahan)
                    .then((response) => {
                        console.log(response)
                        setSelectedBahan(response.nama_bahan);
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err.message);
                    });
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });


        GetAllBahanBaku()
            .then((response) => {
                console.log(response)
                setBahan(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });

        console.log(values);
    }, [id]);



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
            parsedBahanBaku.data.id_pengeluaran_bahan_baku = id;
            parsedBahanBaku.data.id_bahan = bahan.find((item) => item.nama_bahan === parsedBahanBaku.data.nama_bahan).id_bahan;
            console.log(parsedBahanBaku.data);
            UpdatePengeluaranBahanBaku(parsedBahanBaku.data)
                .then((response) => {
                    setSuccess({ bool: true, message: 'Pengadaan Bahan Baku berhasil diubah' });
                    console.log(response);
                    navigateTo('/mo/pengeluaran-bahan-baku');
                })
                .catch((err) => {
                    console.log(err);
                }); 

        }
        setFormErrors({});
        console.log(formErrors);

    }

    return (
        <Card color="white" shadow={false}>
            <form onSubmit={handleSubmit} className=" p-4 mt-8 mb-2 w-[50%] max-w-screen-lg ">
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
                                <option key={item.id} value={item.nama_bahan} selected={selectedBahan === item.nama_bahan ? true : false}>
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