import React, { useState } from "react";
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export function AddResep() {
    const [inputs, setInputs] = useState([{ bahan: "", jumlah: "" }]);

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/admin/resep";
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
                            <Select size="lg" placeholder="Pilih Jenis Produk" className="!border-t-blue-gray-200 focus:!border-t-gray-900">
                                <Option>Produk Utama</Option>
                                <Option>Produk Titipan</Option>
                                <Option>Produk Hampers</Option>
                            </Select>
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Nama Resep
                            </Typography>
                            <Input size="lg" placeholder="Masukkan Nama Resep" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                        </div>
                    </div>
                    {/* Dynamic Inputs */}
                    {inputs.map((input, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Bahan
                                </Typography>
                                <Input size="lg" value={input.bahan} placeholder="Masukkan Bahan" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                            </div>
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Jumlah Kebutuhan
                                </Typography>
                                <Input size="lg" value={input.jumlah} placeholder="Masukkan Jumlah" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
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
