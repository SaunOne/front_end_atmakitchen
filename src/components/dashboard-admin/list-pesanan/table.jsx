import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
    Button,
    IconButton,
    Tab,
    Tabs,
    TabsHeader,
    Alert,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { listPesananData } from "@/data";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/global_context";
import { ConfirmPesanan } from "@/components/dashboard-admin/button";
import { DeletePesanan } from "@/components/dashboard-admin/button";

export function TableListPesanan() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { search } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        setData(listPesananData);
    }, []);

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
        <div className="mb-2 flex flex-col gap-12">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["No", "Nama Pemesan", "Pesanan", "Jumlah", "Total Harga", ""].map((el) => (
                            <th
                                key={el}
                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                            >
                                <Typography
                                    variant="small"
                                    className="text-[11px] text-center font-bold uppercase text-blue-gray-400"
                                >
                                    {el}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.filter((item) => {
                        const lowerCaseSearch = search.toLowerCase();
                        return (
                            item.name.toLowerCase().includes(lowerCaseSearch) ||
                            item.order.some(orderItem => orderItem.toLowerCase().includes(lowerCaseSearch)) ||
                            item.amount.some(amountItem => amountItem.toLowerCase().includes(lowerCaseSearch))
                        );
                    }).map(({ id, name, order, amount, total_harga }, index) => {
                        const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                        const className = `py-3 px-5 text-center ${index === listPesananData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                        return (
                            <tr key={index}>
                                <td className={className}>
                                    <div className="gap-4">
                                        <div>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-semibold"
                                            >
                                                {rowNumber}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {name}
                                    </Typography>
                                </td>
                                <td className={className}>
                                    {order.map((item, index) => (
                                        <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                                            {item}
                                        </Typography>
                                    ))}
                                </td>
                                <td className={className}>
                                    {amount.map((item, index) => (
                                        <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                                            {item}
                                        </Typography>
                                    ))}
                                </td>
                                <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {total_harga}
                                    </Typography>
                                </td>
                                <td className={className}>
                                    <div className="flex gap-2 justify-center">
                                        <ConfirmPesanan />
                                        <DeletePesanan />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-center">
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
