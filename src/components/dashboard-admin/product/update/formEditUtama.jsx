
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
import { GetAllReadyStock, UpdateProduk, GetProdukById } from '@/api/produkApi';
import { GlobalContext } from '@/context/context';


export default function FormEditUtama() {
    const { success, setSuccess } = useContext(GlobalContext);
    const [values, setValues] = useState({});
    const navigateTo = useNavigate();
    const [packaging, setPackaging] = useState([{}]);
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
        formDataObject.id_produk = id;
        console.log(formDataObject);

        UpdateProduk(formDataObject)
            .then((response) => {
                console.log(response);
                setSuccess({ bool: true, message: 'Produk Utama berhasil diedit' });
                console.log(success);
                navigateTo("/admin/product");
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <>
            <h1 className="text-black text-[25px] font-bold mb-5 -mt-3">Edit Produk Utama</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                    {/* <div>
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
                    </div> */}
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
                            defaultValue={values.nama_produk}
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
                            defaultValue={values.quantity}
                            required
                        />
                    </div>
                    {/* <div>
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
                    </div> */}
                    {/* <div>
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
                    </div> */}
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
                            defaultValue={values.harga}
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
                            defaultValue={values.image_produk}
                    
                        />
                    </div>
                    {/* <div>
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
                    </div> */}
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
                        id="textarea"
                        defaultValue={values.deskripsi}>
                            
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

