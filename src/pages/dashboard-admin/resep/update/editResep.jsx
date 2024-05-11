import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { resepAdmin } from "@/validations/validation";
import { useParams } from "react-router-dom";
import { resepTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import { GetResepById , DeleteResepById, GetResepByProduct } from "@/api/resepApi";
import { GetAllBahanBaku, GetBahanBakuById } from "@/api/bahanBakuApi";


export function EditResep() {
    const { id } = useParams();
    const [values, setValues] = useState([{}]);
    const navigateTo = useNavigate();
    const [inputs, setInputs] = useState([{ bahan: "", jumlah: "" }]);
    const [formErrors, setFormErrors] = useState({});
    const [bahan,setBahan] = useState([{}]);
    const [selectedBahan, setSelectedBahan] = useState([]);

    const handleLoadData = (id) => {
        GetResepByProduct(id).then((res) => {
           setSelectedBahan(res);
           
    
        }).catch((err) => {
            console.log('Gagal : ' + err);
        });

        GetAllBahanBaku().then((res) => {
            setBahan(res);
            console.log('Berhasil : ' + res);
        }).catch((err) => {
            console.log('Gagal : ' + err);
        });
    }    

    useEffect(() => {
        handleLoadData(id);

        console.log(values[0]['satuan']);
    }, []);

    const handleChange = (index, field, value) => {
        const newInputs = inputs.map((input, i) => {
            if (i === index) {
                return { ...input, [field]: value };
            }
            return input;
        });
        setInputs(newInputs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        // const parsedResep = resepAdmin.safeParse(formDataObject);
        // if (!parsedResep.success) {
        //     const error = parsedResep.error;
        //     let newErrors = {};
        //     for (const issue of error.issues) {
        //         newErrors = {
        //             ...newErrors,
        //             [issue.path[0]]: issue.message,
        //         };
        //     }
        //     return setFormErrors(newErrors);

        // } else {
        //     navigate('/admin/resep');
        // }
        setFormErrors({});
        console.log(formErrors);
        console.log(parsedResep.data.name);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { bahan: "", jumlah: "" ,satuan : ""}]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    return (
        <Card color="white" shadow={false}>
            <div className="border rounded-xl border-gray-400 p-4 shadow-md">
                <form onSubmit={handleSubmit}>
                    {/* Inputs */}
                    {values.map((input, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">Bahan</Typography>
                                <select
                                    className="w-full rounded text-black border-[1px] h-11"
                                    
                                    onChange={(e) => handleChange(index, 'bahan', e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Bahan</option>
                                    {bahan.map((item) => (
                                        <option key={item.id_bahan} value={item.id_bahan} selected={selectedBahan[index].nama_bahan === item.nama_bahan ? true : false}>{item.nama_bahan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <Typography variant="h6" color="blue-gray" className="mb-2">Jumlah</Typography>
                                <Input
                                    type="number"
                                    name="jumlah_bahan"
                                    value={input.jumlah_bahan}
                                    onChange={(e) => handleChange(index, 'jumlah', e.target.value)}
                                    placeholder="Masukkan Jumlah"
                                    size="lg"
                                />
                            </div>
                            <div className="md:col-span-4 flex justify-end">
                                {inputs.length > 1 && (
                                    <Button onClick={() => handleRemoveInput(index)} color="red">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                )}
                                {index === inputs.length - 1 && (
                                    <Button onClick={handleAddInput} color="green">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button type="submit" className="mt-6">Save</Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default EditResep;
