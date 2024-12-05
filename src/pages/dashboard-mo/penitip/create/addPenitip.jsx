//import React from "react";
import {
    Card,
    Input,
    //Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { penitip } from "../../../../validations/validation";
// import { Dashboard } from "@/layouts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreatePenitip } from "@/api/penitipApi";
import { useContext } from "react";
import { GlobalContext } from "@/context/global_context";

export function AddPenitip() {
    const { setSuccess, success } = useContext(GlobalContext);
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedPenitip = penitip.safeParse(formDataObject);
        if (!parsedPenitip.success) {
            const error = parsedPenitip.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);

        } else {
            navigateTo('/mo/penitip');
        }
        setFormErrors({});
        console.log(formErrors);
        CreatePenitip(parsedPenitip.data)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Penitip berhasil ditambahkan' });
                console.log(success);
                navigateTo("/mo/penitip");
            })
            .catch((err) => {
                console.error(err);
            });

    }

    return (
        <Card color="white" shadow={false}>
            <form onSubmit={handleSubmit} className="p-4 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-3">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Nama Penitip
                    </Typography>
                    <Input
                        type="text"
                        name="nama_penitip"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {formErrors.nama_penitip && (
                        <p className="text-red-600 font-medium">
                            {formErrors.nama_penitip}
                        </p>
                    )}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Nomor Telepon
                    </Typography>
                    <Input
                        type="number"
                        name="no_telp_penitip"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {formErrors.no_telp_penitip && (
                        <p className="text-red-600 font-medium">
                            {formErrors.no_telp_penitip}
                        </p>
                    )}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Alamat
                    </Typography>
                    <Input
                        type="text"
                        name="alamat"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {formErrors.alamat && (
                        <p className="text-red-600 font-medium">
                            {formErrors.alamat}
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

export default AddPenitip;