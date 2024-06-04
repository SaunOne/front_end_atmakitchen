import React, { useState, useEffect, useContext } from "react";
import {
    Typography,
    Chip,
    Button,
} from "@material-tailwind/react";
import { listPesananData } from "@/data";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/global_context";
import { KonfirmasiMO, GetAllTransaction } from "@/api/transaksiApi";
import { PesananModalMO } from "@/components/layouts/pesanan-modal";
import { toast } from "react-toastify";


export function TableListPesanan() {

    const { selectedTabMO, setSelectedTabMO } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const { search } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTransactions] = useState([]);


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    const hours = tomorrow.getHours().toString().padStart(2, '0');
    const minutes = tomorrow.getMinutes().toString().padStart(2, '0');
    const seconds = tomorrow.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDateTime);

    useEffect(() => {
        setIsLoading(true);
        GetAllTransaction()
            .then((response) => {
                setData(response);
                console.log(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpenModal = (item) => {
        setModalData(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalData({});
    };

    const handleInputChange = (e) => {
        setModalData({ ...modalData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        handleCloseModal();
    };


    const handleProses = (modalData) => {
        const updatedData = { ...modalData, status: "diproses" };
        KonfirmasiMO(updatedData)
            .then((response) => {
                console.log(response);
                toast.success("Suskses Memproses Pesanan");
                // Optionally update the local data state here if necessary
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                handleCloseModal();
                window.location.reload();
            });
    };

    const handleTolak = (modalData) => {
        const updatedData = { ...modalData, status: "ditolak" };
        KonfirmasiMO(updatedData)
            .then((response) => {
                console.log(response);
                toast.error("Pesanan Ditolak!")
                // Optionally update the local data state here if necessary
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                handleCloseModal();
                window.location.reload();
            });
    };

    const handleTerima = (modalData) => {
        const updatedData = { ...modalData, status: "diterima" };
        KonfirmasiMO(updatedData)
            .then((response) => {
                console.log(response);
                toast.success("Suskses Menerima Pesanan");
                // Optionally update the local data state here if necessary
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                handleCloseModal();
                window.location.reload();
            });
    };
    
    const handleBulkTerima = () => {
        const updatedData = { ...modalData, status: "diterima semua" };
        KonfirmasiMO(updatedData)
            .then((response) => {
                console.log(response);
                toast.success("Suskses Menerima Pesanan");
                // Optionally update the local data state here if necessary
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                handleCloseModal();
                // Remove the following line to prevent window reload
                window.location.reload();
            });
    }


    const filteredByStatus = data.filter((item) => {
        const lowerCaseSelected = selectedTabMO.toLowerCase();
        return item.status_transaksi.toLowerCase().includes(lowerCaseSelected);
    }).filter((item) => {
        const lowerCaseSelected = selectedTabMO.toLowerCase();
        if (item.status_transaksi === "diterima") {
            return item.tanggal_pengambilan.toLowerCase().includes(formattedDateTime);
        }
        return item.status_transaksi.toLowerCase().includes(lowerCaseSelected);
    });

    const filteredRows = filteredByStatus.filter((item) => {
        const lowerCaseSearch = search.toLowerCase();

        const nameExists = item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(lowerCaseSearch);
        const detailExists = item.detail_transaksi && item.detail_transaksi.some(detail =>
            detail.produk.nama_produk.toLowerCase().includes(lowerCaseSearch) ||
            detail.jumlah_produk.toString().toLowerCase().includes(lowerCaseSearch)
        );
        const totalHargaExists = item.total_harga_transaksi && item.total_harga_transaksi.toString().toLowerCase().includes(lowerCaseSearch);

        return (nameExists || detailExists || totalHargaExists);
    });

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div className="mb-2 flex flex-col gap-12">

            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["No", "No Transaksi", "Pesanan", "Jumlah", "Total Harga", "Status", "Aksi"].map((el) => (
                            <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                <Typography variant="small" className="text-[11px] text-center font-bold uppercase text-blue-gray-400">
                                    {el}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="text-center py-3">
                                <Typography>Data sedang dimuat...</Typography>
                            </td>
                        </tr>
                    ) : (
                        currentRows.map((item, index) => {
                            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                            const className = `py-3 px-5 text-center ${index === listPesananData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                            return (
                                <tr key={index}>
                                    <td className={className}>
                                        <div className="gap-4">
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                    {rowNumber}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                            {item.no_transaksi}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        {item.detail_transaksi.map((detail, index) => (
                                            <Typography key={index} className="text-[14px] font-semibold text-blue-gray-600">
                                                {detail.produk.nama_produk}
                                            </Typography>
                                        ))}
                                    </td>
                                    <td className={className}>
                                        {item.detail_transaksi.map((detail, index) => (
                                            <Typography key={index} className="text-[14px] font-semibold text-blue-gray-600">
                                                {detail.jumlah_produk}
                                            </Typography>
                                        ))}
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.total_harga_transaksi)}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[12px] font-semibold text-yellow-600">
                                            {item.status_transaksi === "pembayaran valid" && (
                                                <Chip variant="gradient" value={item.status_transaksi} color="indigo" size="sm" />
                                            )}
                                            {item.status_transaksi === "diterima" && (
                                                <Chip variant="gradient" value={item.status_transaksi} color="purple" size="sm" />
                                            )}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <div className="flex gap-2 justify-center">

                                            {item.status_transaksi === "pembayaran valid" && (
                                                <Button onClick={() => handleOpenModal(item)} type="submit" className="rounded-md border-[#e8e8e8] px-2 py-1 flex-col item-center hover:bg-blue-200 bg-green-600 text-white font-semibold">
                                                    <span className="text-[12px]">Terima</span>
                                                </Button>
                                            )}
                                            {item.status_transaksi === "diterima" && (
                                                <Button onClick={() => handleOpenModal(item)} type="submit" className="rounded-md border-[#e8e8e8] px-2 py-1 flex-col item-center hover:bg-blue-200 bg-green-600 text-white font-semibold">
                                                    <span className="text-[12px]">Proses</span>
                                                </Button>
                                            )}

                                        </div>
                                    </td>
                                </tr>
                            );


                        })

                    )}
                </tbody>
            </table>
            {
                selectedTabMO === "diterima" && (
                    <div className="flex justify-end gap-2 mb-4">
                        <Button onClick={() => handleBulkTerima} className="bg-green-600 text-white">Terima Semua</Button>
                    </div>
                )
            }


            <div className="flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <PesananModalMO
                modalData={modalData}
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onInputChange={handleInputChange}
                onSave={handleSave}
                handleProses={handleProses}
                handleTolak={handleTolak}
                handleTerima={handleTerima}
            />
        </div>
    );
}
