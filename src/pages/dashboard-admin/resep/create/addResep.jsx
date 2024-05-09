import React, { useState } from "react";
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { resepAdmin } from "@/validations/validation";

export function AddResep() {
    const [inputs, setInputs] = useState([{ bahan: "", jumlah: "" }]);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedResep = resepAdmin.safeParse(formDataObject);
        if (!parsedResep.success) {
            const error = parsedResep.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);

        } else {
            navigateTo('/admin/resep');
        }
        setFormErrors({});
        console.log(formErrors);
        console.log(parsedResep.data.name);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { bahan: "", jumlah: "" }]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    return (
        <Card color="white" shadow={false}>
            <div className="border rounded-xl border-gray-400 p-4 shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Jenis Produk
                            </Typography>
                            <select name="jenis_produk" size="lg" placeholder="Pilih Jenis Produk" className=" md:w-[77vh] w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800">
                                <option value="produk utama">Produk Utama</option>
                                <option value="produk titipan">Produk Titipan</option>
                                <option value="produk hampers">Produk Hampers</option>
                            </select>
                            {formErrors.jenis_produk && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.jenis_produk}
                                </p>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Nama Resep
                            </Typography>
                            <Input name="nama_resep" size="lg" placeholder="Masukkan Nama Resep" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                            {formErrors.nama_resep && (
                                <p className="text-red-600 font-medium">
                                    {formErrors.nama_resep}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Dynamic Inputs */}
                    {inputs.map((input, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Bahan
                                </Typography>
                                <Input type="text" name="bahan" size="lg"  placeholder="Masukkan Bahan" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                                {formErrors.bahan && (
                                    <p className="text-red-600 font-medium">
                                        {formErrors.bahan}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Jumlah Kebutuhan
                                </Typography>
                                <Input name="jumlah_kebutuhan" type="number" size="lg"  placeholder="Masukkan Jumlah" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                                {formErrors.jumlah_kebutuhan && (
                                    <p className="text-red-600 font-medium">
                                        {formErrors.jumlah_kebutuhan}
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-4 flex justify-end">
                                {inputs.length > 1 && (
                                    <button onClick={() => handleRemoveInput(index)} className="mr-2 border-none">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                )}
                                {index === inputs.length - 1 && (
                                    <button onClick={handleAddInput} className=" border-none">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button type="submit" className="mt-6">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default AddResep;
