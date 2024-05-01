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

export function AddPenitip() {
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
            
        }else{
            navigateTo('/mo/penitip');
        }
        setFormErrors({});
        console.log(formErrors);
        console.log(parsedPenitip.data.name);
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

export default AddPenitip;