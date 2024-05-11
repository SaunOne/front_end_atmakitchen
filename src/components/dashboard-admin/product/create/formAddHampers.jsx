import React, { useState, useEffect, useContext } from 'react';
import { Input, Button, Typography, Select, Option, Textarea } from "@material-tailwind/react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetAllProdukUtama, CreateProduk } from '@/api/produkApi';
import { useNavigate } from 'react-router-dom';
import { GetAllPackaging } from '@/api/packagingApi';
import { GlobalContext } from '@/context/context';


export default function FormAddHampers() {
    const [inputs, setInputs] = useState([{ id_produk: "", jumlah_produk: "" }]);
    const [produkUtama, setProdukUtama] = useState([]);
    const [packaging, setPackaging] = useState([]);
    const navigateTo = useNavigate();
    const{success, setSuccess} = useContext(GlobalContext);


    useEffect(() => {
        GetAllProdukUtama()
            .then((response) => {
                console.log(response)
                setProdukUtama(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });

        GetAllPackaging()
            .then((response) => {
                console.log(response)
                setPackaging(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);



    const handleInputChange = (e, name , index) => {
        const { value } = e.target;
        const newInputs = [...inputs];
        newInputs[index][name] = value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { id_produk: "", jumlah_produk: "" }]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        formDataObject.jenis_produk = "Hampers";
        formDataObject.quantity = 1;
        formDataObject.detail_hampers = inputs.map(({ id_produk, jumlah_produk }) => ({ id_produk, jumlah_produk }));
        console.log(formDataObject);

        CreateProduk(formDataObject)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Produk Hampers berhasil ditambahkan' });
                console.log(success);
                navigateTo("/admin/product");
            })
            .catch((err) => {
                console.error(err);
            });


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-1">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Produk
                        </Typography>
                        <Input
                            name='nama_produk'
                            type='text'
                            size="lg"
                            placeholder=""
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Harga
                        </Typography>
                        <Input
                            name='harga'
                            type='number'
                            size="lg"
                            placeholder=""
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Deskripsi Hampers
                        </Typography>
                        <Textarea
                            name='deskripsi'
                            type='text'
                            size="lg"
                            placeholder=""
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Gambar Produk
                        </Typography>
                        <Input
                            name='image_produk'
                            size="lg"
                            type="file"
                            placeholder=""
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Packaging
                        </Typography>
                        <select
                            name='id_packaging'
                            className="w-full rounded text-black border-[#acacac] border-[1px] h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                            required
                        >
                            <option value="">Pilih Packaging</option>
                            {packaging.map((item) => (
                                <option key={item.id_packaging} value={item.id_packaging} className='text-black'>
                                    {item.nama_packaging}
                                </option>
                            ))}
                        </select>
                    </div>
                    {inputs.map((input, index) => (
                        <div key={input.id} className="mb-1 gap-2 grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Isi Produk
                                </Typography>
                                <select
                                    className="w-full rounded text-black border-[#acacac] border-[1px] h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    value={input.id_produk}
                                    onChange={(e) => handleInputChange(e, 'id_produk', index)}
                                    required
                                >
                                    <option value="">Pilih Produk</option>
                                    {produkUtama.map((item) => (
                                        <option key={item.id_produk} value={item.id_produk} className='text-black'>
                                            {item.nama_produk}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Jumlah
                                </Typography>
                                <Input
                                    type='number'
                                    size="lg"
                                    placeholder=""
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    value={input.jumlah_produk}
                                    onChange={(e) => handleInputChange(e,'jumlah_produk', index)}
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
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
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="mt-6">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
}
