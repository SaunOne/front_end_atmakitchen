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
import { GlobalContext } from "@/context/context";
import { GetAllTransaksiAdmin } from "@/api/customersApi";

export function TableHistory() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { search } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleStatusColor = (status) => {
    switch(status) {
        case "Sudah Dibayar":
        case "Pembayaran Valid":
        case "Selesai":
            return "green";
        case "Diproses":
        case "Sedang di kirim":
        case "Siap Di Pick Up":
            return "orange";
        default:
            return "red";
    }
  }

  useEffect(() => {
    GetAllTransaksiAdmin()
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((err) => {
            console.log(err);
            setError(err.message)
        });
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
        <table className="w-full min-w-[640px]">
            <thead>
                <tr>
                {["No", "No Transaksi", "Nama Pemesan", "Jenis Pesanan", "Total Harga Transaksi", "Biaya Pengiriman", "Jumlah Pembayaran", "Jenis Pengiriman", "Status"].map(
                    (el) => (
                    <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5"
                    >
                        <Typography
                        variant="small"
                        className="text-[11px] text-center font-bold uppercase text-blue-gray-400"
                        >
                        {el}
                        </Typography>
                    </th>
                    )
                )}
                </tr>
            </thead>
            <tbody>
                {currentRows.filter((item) => {
                    const lowerCaseSearch = search.toLowerCase();
                    return(
                        item.nama_lengkap.toLowerCase().includes(lowerCaseSearch) ||
                        item.id_transaksi.toString().includes(lowerCaseSearch) ||
                        item.jenis_pesanan.toLowerCase().includes(lowerCaseSearch) ||
                        item.jumlah_pembayaran.toString().includes(lowerCaseSearch) ||
                        item.jenis_pengiriman.toLowerCase().includes(lowerCaseSearch) ||
                        item.status_transaksi.toLowerCase().includes(lowerCaseSearch) 
                    );
                }).map(
                    ({ id_transaksi, nama_lengkap, jenis_pesanan, jumlah_pembayaran, total_harga_transaksi, biaya_pengiriman, jenis_pengiriman, status_transaksi }, index) => {
                    const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                    const className = `py-3 px-5 text-center ${
                    index === listPesananData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                    <tr key={index}>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {rowNumber}
                            </Typography>
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {id_transaksi}
                            </Typography>
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {nama_lengkap}
                            </Typography>
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {jenis_pesanan}
                            </Typography>  
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {total_harga_transaksi}
                            </Typography>  
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {biaya_pengiriman}
                            </Typography>  
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {jumlah_pembayaran}
                            </Typography>
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {jenis_pengiriman}
                            </Typography>
                        </td>
                        <td className="flex justify-center my-5">
                        <Chip
                            variant="gradient"
                            color={handleStatusColor(status_transaksi)}
                            value={status_transaksi}
                            size="sm"
                            className="py-0.5 px-2 text-white flex justify-center"
                        />
                        </td>
                    </tr>
                    );
                }
                )}
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
