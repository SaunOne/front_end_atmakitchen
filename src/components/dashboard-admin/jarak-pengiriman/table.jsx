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
                                    type="button" onClick={() => handleOpenModal(item.id_transaksi)}>
                                    Input Jarak
                                </button>
                                <div className={`pointer-events-none fixed inset-0 ${isModalOpen ? 'z-[999]' : 'hidden'} grid h-screen w-screen place-items-center bg-black bg-opacity-20 ${isModalOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                    <div className="pointer-events-auto relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                        <button onClick={handleCloseModal} className=" absolute top-3 right-3 text-lg font-bold border-none">
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </button>
                                        <form onSubmit={handleSubmit}>
                                            <div class="flex flex-col gap-4 p-6">
                                                <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                    Jarak Pengiriman
                                                </h4>
                                                <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                    Alamat
                                                </h6>
                                                <div class="relative h-11 w-full min-w-[200px]">
                                                <input
                                                    value={item.alamat?.detail_alamat || '-'}
                                                    class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                    disabled />
                                                </div>
                                                <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                    Jarak Pengiriman
                                                </h6>
                                                <div class="relative h-11 w-full min-w-[200px]">
                                                <input
                                                    type="number"
                                                    name="radius"
                                                    class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>
                                                {formErrors.radius && (
                                                    <p className="text-red-600 font-medium mb-1 text-left">
                                                        {formErrors.radius}
                                                    </p>
                                                )}
                                                </div>                                            
                                            </div>
                                            <div class="p-6 pt-0">
                                                <button
                                                class="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                                                type="submit"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>  
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
