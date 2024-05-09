import { Typography } from "@material-tailwind/react";
import { UpdatePengeluaranBahan, DeletePengeluaranBahan } from "../button";
import React, { useEffect, useState, useContext } from "react";


import { GlobalContext } from "@/context/context";
import { GetAllPengeluaranBahanBaku } from "@/api/pengeluaranBahanBakuApi";

export default function PengeluaranBahanTable() {
    const [data, setData] = useState([]);
    const { search} = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        GetAllPengeluaranBahanBaku()
            .then((response) => {
                console.log(response)
                setData(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    console.log(search);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Get current page data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["Tanggal Pengadaan", "Nama Bahan", "Jumlah", "Satuan", "Total Harga", "Aksi"].map(
                            (el) => (
                                <th
                                    key={el}
                                    className="border-b border-r border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentRows
                        .filter((item) => {
                            const lowerCaseSearch = search.toLowerCase();
                            return (
                                lowerCaseSearch === "" ||
                                item.tanggal.toLowerCase().includes(lowerCaseSearch) ||
                                item.nama_bahan.toLowerCase().includes(lowerCaseSearch) ||
                                item.satuan.toLowerCase().includes(lowerCaseSearch) ||
                                item.jumlah.toLowerCase().includes(lowerCaseSearch) ||
                                item.harga_beli.toLowerCase().includes(lowerCaseSearch)
                            );
                        })
                        .map(({ id_pembelian_bahan, tanggal, nama_bahan, jumlah, satuan, harga_beli }, index) => {
                            const className = `py-3 px-5 border-r  ${index === currentRows.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;
                            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                            return (
                                <tr key={index}>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {tanggal}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {nama_bahan}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {jumlah}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {satuan}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {harga_beli}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <div className="flex gap-2">
                                            <UpdatePengeluaranBahan id={id_pembelian_bahan} />
                                            <DeletePengeluaranBahan id={id_pembelian_bahan} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
