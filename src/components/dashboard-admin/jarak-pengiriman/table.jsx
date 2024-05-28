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
  Input
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { listPesananData } from "@/data";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/context";
import { ConfirmJarak } from "@/components/dashboard-admin/button";
import { DeleteJarak } from "@/components/dashboard-admin/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { GetAllUserTransaction, KonfirmasiAdmin } from "@/api/transaksiApi";
import { jarakAdmin } from "@/validations/validation";

export function TableJarakPengiriman() {
  const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const { search, selectedTabValue } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const {setSuccess, success} = useContext(GlobalContext);

  const handleOpenModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
    console.log(itemId);
};


const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    
    // Modifikasi parsedJarak.data untuk menambahkan ID yang sesuai
    const dataToSend = {
        ...formDataObject,
        id_transaksi: selectedItemId,
        status : "input biaya pengiriman"
    };

    console.log(formDataObject);
    const parsedJarak = jarakAdmin.safeParse(dataToSend);
    if (!parsedJarak.success) {
        const error = parsedJarak.error;
        let newErrors = {};
        for (const issue of error.issues) {
            newErrors = {
                ...newErrors,
                [issue.path[0]]: issue.message,
            };
        }
        console.log(newErrors);
        console.log(parsedJarak);
        return setFormErrors(newErrors);
    } else {
        console.log(parsedJarak.data);
        KonfirmasiAdmin(dataToSend)
            .then((response) => {
                console.log(response); 
                setSuccess({bool: true, message: 'Radius berhasil ditambahkan'});
                console.log(success);
                setIsModalOpen(false);
                navigateTo("/admin/jarakPengiriman");
            })
            .catch((err) => {
                console.error(err);
            });
    }
    setFormErrors({});
    console.log(formErrors);
    console.log(parsedJarak.data.nama_bahan);
};


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  useEffect(() => {
    GetAllUserTransaction()
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
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

  const filteredRows = currentRows.filter((item) => {
    const lowerCaseSearch = search.toLowerCase();
    // Check nama_lengkap
    const nameExists = item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(lowerCaseSearch);
    // Check in detail_transaksi.nama_produk and detail_transaksi.jumlah_produk
    const detailExists = item.detail_transaksi && item.detail_transaksi.some(detail =>
      detail.produk.nama_produk.toLowerCase().includes(lowerCaseSearch) ||
      detail.jumlah_produk.toString().toLowerCase().includes(lowerCaseSearch)
    );
    // Check total_harga_transaksi
    const totalHargaExists = item.total_harga_transaksi && item.total_harga_transaksi.toString().toLowerCase().includes(lowerCaseSearch);
    // Check status_transaksi
    const statusExists = item.status_transaksi === "menunggu biaya pengiriman";
    // Return true if either condition is met and status is "Menunggu Pembayaran"
    return (nameExists || detailExists || totalHargaExists) && statusExists;
  });

  return (
    <div className="mb-2 flex flex-col gap-12">
        <table className="w-full min-w-[640px] table-auto">
            <thead>
                <tr>
                {["No", "No Transaksi", "Nama Pemesan", "Alamat", "Jenis Pengiriman", "Aksi"].map((el) => (
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
                {filteredRows.map((item, index) => {
                const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                const className = `py-3 px-5 text-center ${
                index === listPesananData.length - 1 ? "" : "border-b border-blue-gray-50"
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
                            {item.id_transaksi}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                            {item.nama_lengkap}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                            {item.alamat?.detail_alamat || '-'}
                        </Typography>
                    </td>
                    <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.jenis_pengiriman}
                    </Typography>
                    </td>
                        <td className={className}>
                            <div className="flex gap-2 justify-center">
                            <button
                                className="select-none rounded-md bg-green-100 p-2 text-center align-middle font-sans text-xs font-bold uppercase text-green-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button" 
                                onClick={() => handleOpenModal(item.id_transaksi)}
                                >
                                Input Jarak
                            </button>

                            {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
                                <div className="bg-white rounded-lg p-6 w-1/3">
                                <div className="flex justify-between items-center border-b pb-2 mb-4">
                                    <h3 className="text-lg font-semibold">Jarak Pengiriman</h3>
                                    <button 
                                    onClick={handleCloseModal} 
                                    className="text-gray-600 hover:text-gray-900 border-none"
                                    >
                                    <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                                        Alamat
                                    </label>
                                    <input
                                        id="alamat"
                                        value={item.alamat?.detail_alamat || '-'}
                                        className="w-full h-10 px-3 py-2 font-sans text-sm border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled
                                    />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jarak Pengiriman
                                    </label>
                                    <input
                                        type="number"
                                        id="radius"
                                        name="radius"
                                        className="w-full h-10 px-3 py-2 font-sans text-sm border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {formErrors.radius && (
                                        <p className="text-red-600 font-medium mb-1 text-left">
                                        {formErrors.radius}
                                        </p>
                                    )}
                                    </div>
                                    <div className="flex justify-end">
                                    <button
                                        onClick={handleCloseModal}
                                        className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                    >
                                        Tutup
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                    >
                                        Simpan
                                    </button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            )}
  
                                <DeleteJarak/>
                            </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        {/* )} */}
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
