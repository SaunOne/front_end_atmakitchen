import { Typography, Input } from "@material-tailwind/react";

import { UpdatePengeluaranLain, DeletePengeluaranLain } from "../button";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context/global_context";

import { GetAllPemakaianBahanBaku } from "@/api/pemakaianBahanApi";

export function PemakaianBahanTable() {
    const tanggal = new Date().toLocaleDateString();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(`${tanggal.substr(6, 4)}-${tanggal.substr(3, 2)}-${tanggal.substr(0, 2)}`);
    const { search } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        GetAllPemakaianBahanBaku(date)
            .then((response) => {
                console.log(response)
                setData(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, [date]);

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


    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div>
            <div className=" mx-3 mb-6 w-[300px]">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Filter Date:</label>
                <Input type="date" name="date" className="px-4 py-2 border rounded-md" value={date} defaultValue={date} onChange={handleDateChange} />
            </div>


            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["Bahan", "Jumlah", "Satuan", "Tanggal"].map(
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
                                item.nama_bahan.toLowerCase().includes(lowerCaseSearch)
                            );
                        })
                        .map(({  nama_bahan, jumlah, satuan, tanggal }, index) => {
                            const className = `py-3 px-5 border-r  ${index === currentRows.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;
                            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                            return (
                                <tr key={index}>
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
                                            {tanggal}
                                        </Typography>
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
