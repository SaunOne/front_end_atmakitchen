//import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { penitip } from "../../../../validations/validation";
// import { Dashboard } from "@/layouts";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { penitipTableData } from "@/data";
import { UpdatePenitip, GetPenitipById } from "@/api/penitipApi";
import { set } from "zod";

export function EditPenitip() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({});
    const navigateTo = useNavigate();

    console.log(id);
    //Uji coba
    useEffect(() => {
        GetPenitipById({ id })
            .then((response) => {
                console.log(response)
                setValues(response);
                
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });



        console.log(values);

    }, [id]);


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
        parsedPenitip.data.id_penitip = id;
        UpdatePenitip(parsedPenitip.data)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Card color="transparent" shadow={false}>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
                        defaultValue={values.nama_penitip}
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
                        defaultValue={values.no_telp_penitip}
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
                        defaultValue={values.alamat}
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

export default EditPenitip;