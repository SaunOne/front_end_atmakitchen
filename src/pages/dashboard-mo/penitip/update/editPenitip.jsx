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

export function EditPenitip() {
    const {id} = useParams();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({});
    const navigateTo = useNavigate();

    console.log(id);
    //Uji coba
    useEffect(() => {
        const data = penitipTableData.find(item => item.id === id);
        if (data) {
            setValues({
                name: data.name,
                phone: data.phone,
                address: data.address
            });
        }
    }, [id]);

    // useEffect(() => {
    //     axios.get(`http://localhost:3000/penitip/${id}`)
    //     .then(res => {
    //         setValues({...values, name: res.data.name, phone: res.data.phone, address: res.data.address})
    //     })
    //     .catch(err => console.log(err))
    // }, []);


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
            console.log(parsedPenitip.data.name);
            navigateTo('/mo/penitip');
        }
        setFormErrors({});

        console.log(formErrors);
        
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
                        name="name"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        defaultValue={values.name}
                    />
                    {formErrors.name && (
                        <p className="text-red-600 font-medium">
                            {formErrors.name}
                        </p>
                    )}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Nomor Telepon
                    </Typography>
                    <Input
                        type="number"
                        name="phone"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        defaultValue={values.phone}
                    />
                    {formErrors.phone && (
                        <p className="text-red-600 font-medium">
                            {formErrors.phone}
                        </p>
                    )}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Alamat
                    </Typography>
                    <Input
                        type="text"
                        name="address"
                        size="lg"
                        placeholder=""
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        defaultValue={values.address}
                    />
                    {formErrors.address && (
                        <p className="text-red-600 font-medium">
                            {formErrors.address}
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