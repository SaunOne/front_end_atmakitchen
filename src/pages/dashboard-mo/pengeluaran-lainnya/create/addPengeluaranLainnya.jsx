import {
    Card,
    Input,
    //Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useContext} from "react";
import { pengeluaranLainnya } from "../../../../validations/validation";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/context";
import { CreatePengeluaranLain } from "@/api/pengeluaranLainApi";

export function AddPengeluaranLainnya() {
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();

    const { setSuccess, success } = useContext(GlobalContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedPengeluaran = pengeluaranLainnya.safeParse(formDataObject);
        if (!parsedPengeluaran.success) {
            const error = parsedPengeluaran.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);

        } else {
            CreatePengeluaranLain(parsedPengeluaran.data)
                .then((response) => {
                    console.log(response);
                    setSuccess({ bool: true, message: 'Pengeluaran Lain-lain berhasil ditambahkan' });
                    console.log(success);
                    navigateTo('/mo/pengeluaran-lain-lain');
                })
                .catch((err) => {
                    console.error(err);
                });
            
        }
        setFormErrors({});
        console.log(formErrors);

    }

    return (
        <Card color="white" shadow={false}>
            <form onSubmit={handleSubmit} className="p-4 mt-8 mb-2 w-[50%] max-w-screen-lg ">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                    Peruntukan Pengeluaran
                </Typography>
                <Input
                    type="text"
                    name="nama_pengeluaran"
                    size="lg"
                    placeholder=""
                    className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}

                />
                {formErrors.nama_pengeluaran && (
                    <p className="text-red-600 font-medium">{formErrors.nama_pengeluaran}</p>
                )}
                '
                <Typography variant="h6" color="blue-gray" className="mb-3">
                    Total Pengeluaran
                </Typography>
                <Input
                    type="number"
                    name="jumlah_pengeluaran"
                    size="lg"
                    placeholder=""
                    className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                />
                {formErrors.jumlah_pengeluaran && (
                    <p className="text-red-600 font-medium">
                        {formErrors.jumlah_pengeluaran}
                    </p>
                )}

                <Button type="submit" className="mt-6" fullWidth>
                    Save
                </Button>
            </form>
        </Card>
    );
}

export default AddPengeluaranLainnya;
