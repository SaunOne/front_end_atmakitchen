import { Typography } from "@material-tailwind/react";
import { penitipTableData } from "@/data";
import { UpdatePenitip, DeletePenitip } from "../button";
import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "@/context/searchContext";

export default function PenitipTable() {
    const [data, setData] = useState([]);
    const { search } = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        setData(penitipTableData);
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
                        {["No", "Nama", "Nomor Telepon", "Alamat", "Produk Titipan", "Aksi"].map(
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
                                item.name.toLowerCase().includes(lowerCaseSearch) ||
                                item.phone.toLowerCase().includes(lowerCaseSearch) ||
                                item.address.toLowerCase().includes(lowerCaseSearch) ||
                                item.product.some((product) =>
                                    product.name.toLowerCase().includes(lowerCaseSearch)
                                )
                            );
                        })
                        .map(({ id, name, phone, address, product }, index) => {
                            const className = `py-3 px-5 border-r  ${index === currentRows.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;
                            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                            return (
                                <tr key={index}>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {rowNumber}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {phone}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-xs font-[400] text-blue-gray-600">
                                            {address}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        {product.map(({ id, name, status, price, stok }, key) => {
                                            const className2 = `py-3 px-5 ${key === product.length - 1
                                                ? ""
                                                : "border-b border-blue-gray-50"
                                                }`;
                                            return (
                                                <div className={className2} key={id}>
                                                    <p>{name}</p>
                                                    <p>Stok : {stok}</p>
                                                    <p>Status : {status}</p>
                                                    <p>Rp. {price}</p>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td className={className}>
                                        <div className="flex gap-2">
                                            <UpdatePenitip id={id} />
                                            <DeletePenitip id={id} />

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
