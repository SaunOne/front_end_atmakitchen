
import {
    Input,
    Button,
    Typography,
    Textarea,
    Select
} from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GetAllPackaging } from '@/api/packagingApi';
import { GetAllReadyStock, CreateProduk } from '@/api/produkApi';
import { GlobalContext } from '@/context/context';


export function FormAddUtamaBaru() {
    const { success, setSuccess } = useContext(GlobalContext);
    const navigateTo = useNavigate();
    const [packaging, setPackaging] = useState([{}]);

    useEffect(() => {
        GetAllPackaging()
            .then((response) => {
                console.log(response)
                setPackaging(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());

        formDataObject.jenis_produk = "Utama";
        console.log(formDataObject);

        CreateProduk(formDataObject)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Produk Utama berhasil ditambahkan' });
                console.log(success);
                navigateTo("/admin/product");
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Produk Stok
                        </Typography>
                        <Input
                            name='nama_produk_stok'
                            type='text'
                            size="lg"
                            placeholder="Lapis Legit"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Jual Produk
                        </Typography>
                        <Input
                            name='nama_produk'
                            type='text'
                            size="lg"
                            placeholder="Lapis Legit 1 1/2 Loyang"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Quantity
                        </Typography>
                        <Input
                            name='quantity'
                            type='number'
                            size="lg"
                            placeholder="1.5, 0.5"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Satuan
                        </Typography>
                        <Input
                            name='satuan'
                            type='text'
                            size="lg"
                            placeholder="loyang, pcs, dll"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Kategori Produk
                        </Typography>
                        <Input
                            name='kategori_produk'
                            type='text'
                            size="lg"
                            placeholder="Lapis Legit 1 1/2 Loyang"
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
                            placeholder="200000"
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
                </div>
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                        Deskripsi Produk
                    </Typography>
                    <Textarea
                        name='deskripsi'
                        size="lg"
                        class="form-control !border-t-blue-gray-200 focus:!border-t-gray-900"
                        rows="3"
                        id="textarea">
                    </Textarea>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="mt-6 w-[25%]">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
}

export function FormAddUtamaLama() {
    const [produkStok, setProdukStok] = useState([{}]);
    const [packaging, setPackaging] = useState([{}]);
    const { success, setSuccess } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    useEffect(() => {
        GetAllReadyStock()
            .then((response) => {
                console.log(response)
                setProdukStok(response);
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
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());

        formDataObject.jenis_produk = "Utama";
        console.log(formDataObject);

        CreateProduk(formDataObject)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Produk Utama berhasil ditambahkan' });
                console.log(success);
                navigateTo("/admin/product");
            })
            .catch((err) => {
                console.error(err);
            });

    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Nama Jual Produk
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
                            Nama Produk Stok
                        </Typography>
                        <select
                            name='id_stok_produk'
                            size="lg"
                            className=" w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        >
                            <option value="">Pilih Produk Stok</option>
                            {produkStok.map((item) => (
                                <option key={item.id} value={item.id_stok_produk}>
                                    {item.nama_produk_stok}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Kategori Produk
                        </Typography>
                        <Input
                            name='kategori_produk'
                            type='text'
                            size="lg"
                            placeholder="Lapis Legit 1 1/2 Loyang"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Quantity
                        </Typography>
                        <Input
                            name='quantity'
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
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Foto Produk
                        </Typography>
                        <Input
                            name='image_produk'
                            type='file'
                            size="lg"
                            placeholder=""
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 p-2"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            required
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
                            id="textarea">
                        </Textarea>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="mt-6 w-[25%]">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
}