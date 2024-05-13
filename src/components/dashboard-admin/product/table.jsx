import React, { useState, useEffect, useContext, use } from "react";
import {
    Typography,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { GlobalContext } from "@/context/context";
import { productTableData } from "@/data";
import { DeleteProduct, UpdateProduct } from "../button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GetAllProduk } from "@/api/produkApi";
import { getImage } from "@/api";

export default function ProductTable() {
    const { search, selectedTabValue } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetAllProduk()
            .then((response) => {
                console.log(response)
                setData(response);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            }).finally(() => {
                setIsLoading(false);
            }
            )
    }, []);


    return (
        <>
            {isLoading ? ( 
                <div>Loading...</div>
            ) : (
                <table className="w-full min-w-[640px] table-auto">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["No", "Nama Produk", "Deskripsi", "Harga", "Stok", ""].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-black"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter((item) => {
                                return item.jenis_produk === selectedTabValue;
                            }).filter((el) => {
                                const lowerCaseSearch = search.toLowerCase();
                                return (
                                    lowerCaseSearch === "" ||
                                    el.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
                                    el.harga.toString().includes(search.toLowerCase()) ||
                                    el.jumlah_stok.toString().includes(search.toLowerCase()) ||
                                    el.deskripsi.toLowerCase().includes(search.toLowerCase())
                                );

                            }).map(({ id_produk, image_produk, nama_produk, deskripsi, harga, jumlah_stok }, index) => {
                                const className = `py-3 px-5 border-r  ${index === data.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                    }`;
                                return (
                                    <tr key={id_produk}>
                                        <td className={className}>{index+1}</td>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar src={getImage(image_produk)} alt={nama_produk} size="sm" variant="rounded" />
                                                <div>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {nama_produk}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-[12px] font-semibold text-black">
                                                {deskripsi}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-black">
                                                {harga}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-black">
                                                {jumlah_stok}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <div className="flex gap-2">
                                                <UpdateProduct id={id_produk} />
                                                <DeleteProduct id={id_produk} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </table>
            )}

        </>
    );
}
