import React, { useContext } from 'react';
import {
    Input,
    Button,
    Typography,
    Select,
    Option,
    Textarea
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetAllPenitip } from '@/api/penitipApi';
import { GetAllProdukTitipan, GetProdukById, UpdateProduk } from '@/api/produkApi';
import { GlobalContext } from '@/context/global_context';
import { set } from 'zod';

export default function FormEditTitipan() {
    const [values, setValues] = useState({})
    const [penitip, setPenitip] = useState([]);
    const navigateTo = useNavigate();
    const { success, setSuccess } = useContext(GlobalContext);
    const { id } = useParams();

    useEffect(() => {
        GetProdukById(id).
            then((response) => {
                console.log(response)
                setValues(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });

        GetAllPenitip()
            .then((response) => {
                console.log(response)
                setPenitip(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        formDataObject.quantity = 1;
        formDataObject.jenis_produk = "Titipan";
        formDataObject.id_produk = id;
        console.log(formDataObject);


        UpdateProduk(id)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Produk Titipan berhasil diedit' });
                console.log(success);
                navigateTo("/admin/product");
            })
            .catch((err) => {
                console.error(err);
            });

    }

    return (
        <>
            <h1 className="text-black text-[25px] font-bold mb-5 -mt-3">Edit Produk Titipan</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                    {/* <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Penitip
                        </Typography>
                        <select
                            name='id_penitip'
                            size="lg"
                            className=" w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        >
                            <option value="" disabled >Pilih Produk</option>
                            {penitip.map((item) => (
                                <option key={item.id_penitip} value={item.id_penitip}>
                                    {item.nama_penitip}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Produk
                        </Typography>
                        <Input
                            name='nama_produk'
                            type='text'
                            size="lg"
                            placeholder="Matcha Latte"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            defaultValue={values.nama_produk}
                            required
                        />
                    </div>
                    {/* <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Jumlah Produk
                        </Typography>
                        <Input
                            name='jumlah_produk_dititip'
                            type='number'
                            size="lg"
                            placeholder="3"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div> */}

                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Harga
                        </Typography>
                        <Input
                            name='harga'
                            type='number'
                            size="lg"
                            placeholder="2000000"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            defaultValue={values.harga}
                            required
                        />
                    </div>
                    {/* <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Satuan
                        </Typography>
                        <Input
                            name='satuan'
                            type='number'
                            size="lg"
                            placeholder="loyang, pcs, dll"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div> */}

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
                            defaultValue={values.image_produk}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Deskripsi Produk
                        </Typography>
                        <Textarea
                            name='deskripsi'
                            type='text'
                            size="lg"
                            class="form-control !border-t-blue-gray-200 focus:!border-t-gray-900"
                            rows="3"
                            id="textarea"
                            defaultValue={values.deskripsi}
                        >

                        </Textarea>
                    </div>
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


