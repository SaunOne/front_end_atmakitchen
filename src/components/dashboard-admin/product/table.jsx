import React, { useState, useEffect, useContext } from "react";
import {
    Typography,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { GlobalContext } from "@/context/context";
import { productTableData } from "@/data";
import { DeleteProduct, UpdateProduct } from "../button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function ProductTable() {
    const { search, selectedTabValue } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        let filteredData = productTableData;
        switch (selectedTabValue) {
            case "Utama":
                filteredData = productTableData.filter((el) => el.jenis_produk === "Utama");
                break;
            case "Titipan":
                filteredData = productTableData.filter((el) => el.jenis_produk === "Titipan");
                break;
            case "Hampers":
                filteredData = productTableData.filter((el) => el.jenis_produk === "Hampers");
                break;
            default:
                break;
        }
        setData(filteredData);
    }, [selectedTabValue]);

    useEffect(() => {
        setData(productTableData.filter((el) =>
            el.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
            el.harga.toString().includes(search.toLowerCase()) ||
            el.stok_produk.toString().includes(search.toLowerCase()) ||
            el.deskripsi.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <>
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
                    {currentItems.map(({ id_produk, image_produk, nama_produk, deskripsi, harga, stok_produk }, index) => {
                        const className = `py-3 px-5 border-r  ${index === currentItems.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                            }`;
                        return (
                            <tr key={id_produk}>
                                <td className={className}>{indexOfFirstItem + index + 1}</td>
                                <td className={className}>
                                    <div className="flex items-center gap-4">
                                        <Avatar src={image_produk} alt={nama_produk} size="sm" variant="rounded" />
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
                                        {stok_produk}
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
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    className={`p-2 pt-0 h-7 pb-0 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon className="h-4 w-4 p-0" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        className={`p-2 text-sm h-7 pt-0  pb-0 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none ${currentPage === i + 1 ? "bg-gray-700 text-white" : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
                <Button
                    className={`p-2 text-gray-900 h-7 pt-0  pb-0 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    <ArrowRightIcon className="h-5 w-5" />
                </Button>
            </div>
        </>
    );
}
