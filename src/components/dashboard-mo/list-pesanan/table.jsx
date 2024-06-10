import React, { useState, useEffect, useContext } from "react";
import {
    Typography,
    Chip,
    Button,
    Input,
    Input,
} from "@material-tailwind/react";
import { listPesananData } from "@/data";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/global_context";
import { KonfirmasiMO, GetAllTransaction, SendNotifProcess, BulkProses } from "@/api/transaksiApi";
import { PesananModalMO } from "@/components/layouts/pesanan-modal";
import { toast } from "react-toastify";
import { GetAllPemakaianBahan, GetAllPemakaianBahanMerge, GetAllPemakaianBahanRekap, SendNotifProcess } from "@/api/bahanBakuApi";


export function TableListPesanan() {
    const today = new Date();
    const [user, setUser] = useState();
    const [trans, setTrans] = useState();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    const [merge, setMerge] = useState([]);
    const [rekap, setRekap] = useState([]);
    const { selectedTabMO, setSelectedTabMO } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTransactions] = useState([]);
    const [currentTransactionId, setCurrentTransactionId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);


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
    const [date, setDate] = useState(formattedDate);
    console.log(date)
    console.log(data2);
    console.log(merge);
    console.log(rekap);
    const [date, setDate] = useState(formattedDate);
    console.log(date)
    console.log(data2);
    console.log(merge);
    console.log(rekap);

    useEffect(() => {
        setIsLoading(true);
        GetAllTransaction(date)
            .then((response) => {
                setData(response);
                console.log(response);

            })
            .catch((err) => {
                setError(err.message);
            })
            ;

        GetAllPemakaianBahan(date)
            .then((response) => {
                setData2(response);
                console.log(response);
                console.log(data2);
                GetAllPemakaianBahanMerge(date)
                    .then((response) => {
                        setMerge(response);
                        console.log(response);
                        console.log(merge);
                        GetAllPemakaianBahanRekap(date)
                            .then((response) => {
                                setRekap(response);
                                console.log(response);
                                console.log(rekap);
                            })
                            .catch((err) => {
                                setError(err.message);
                            })
                            .finally(() => {
                                setIsLoading(false);
                            });

                    })
                    .catch((err) => {
                        setError(err.message);
                    })

            })
            .catch((err) => {
                setError(err.message);
            })

    }, [date]);



    useEffect(() => {
        console.log(user);
        console.log(trans);

        if(user === undefined && trans === undefined){
        }else{
            SendNotifProcess(user, trans)
            .then((response) => {
                console.log(response);

            })
            .catch((err) => {
                console.log(err);
            })
        }
        

    }, [user]);





    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpenModal = (item) => {
        console.log(item);
        setModalData(item);
        console.log(item);
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
        console.log(updatedData);

        KonfirmasiMO(updatedData)
            .then((response) => {
                console.log(response);
                if (response.message === "Bahan Masih Ada Yang Kurang") {
                    toast.error("Bahan Masih Ada Yang Kurang!")
                    response.data.forEach((item) => {
                        toast.error(item);
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000)
                } else {
                    setTimeout(() => {
                        setUser(updatedData.id_user);
                        setTrans(updatedData.id_transaksi);
                    }, 2000)

                    toast.success("Suskses Memproses Pesanan");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                }

                // Optionally update the local data state here if necessary
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                handleCloseModal();

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
        const updatedData = {};
        updatedData.data = rekap;
        updatedData.date = date;
        console.log("masuk sini");
        console.log(rekap);
        console.log(updatedData);

        BulkProses(updatedData)
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
    });

    const filteredRows = filteredByStatus.filter((item) => {
        if (selectedTabMO.toLowerCase() === "diterima") {
            const dateExists = item.tanggal_pengambilan && item.tanggal_pengambilan.toLowerCase().includes(date);
            console.log(date);
            return (dateExists);
        }
    });

    const filteredData = data2.filter((item) => {
        const dateExists = item.tanggal_pengambilan && item.tanggal_pengambilan.toLowerCase().includes(date);
        console.log(date);
        return (dateExists);
    });

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1); // Menambahkan satu hari

        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const newDate = `${year}-${month}-${day}`;

        setDate(newDate);
        console.log(newDate);
    };

    const getPreviousDay = (date) => {
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1); // Mengurangi satu hari

        const year = previousDate.getFullYear();
        const month = (previousDate.getMonth() + 1).toString().padStart(2, '0');
        const day = previousDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const cekKurang = (rekap) => {
        for (let item of rekap) {
            if (item.kekurangan_bahan < 0) {
                return false;
            }
        }
        return true;
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = selectedTabMO === "diterima" ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    console.log(currentRows);

    return (
        <div className="mb-2 flex flex-col gap-12">
            {selectedTabMO.toLowerCase() === "diterima" && (
                <>
                    <div className="px-5">
                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">Filter Date:</label>
                        <div className="w-[50%] mb-5">
                            <Input type="date" name="date" className="px-4 w-[100px] mb-4 py-2 border rounded-md" value={getPreviousDay(date)} onChange={handleDateChange} />
                        </div>

                        <div className="flex justify-start p-3 gap-5">
                            <div className="w-[40%] max-h-[500px]  overflow-auto">
                                <div className="rounded-md border-[#e8e8e8] px-6 py-1 flex-col item-center bg-gray-600 text-white font-semibold">
                                    <span className="text-[14px]">Rekap Pesanan</span>
                                </div>
                                <div className="border rounded-md mt-1 p-3 border-[#c7c7c7]">
                                    {isLoading ? (
                                        <div className="text-center py-3">
                                            <Typography>Data sedang dimuat...</Typography>
                                        </div>
                                    ) : (
                                        currentRows.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item.detail_transaksi.map((detail, index) => (
                                                        <div key={index}>
                                                            {detail.produk.map((produk, produkIndex) => (
                                                                <div key={`${index}-${produkIndex}`}>
                                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                                        - ({detail.jumlah_produk}) {produk.nama_produk}
                                                                    </Typography>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                                <div className=" mt-4 max-h-[500px] overflow-auto">
                                    <div className="rounded-md border-[#e8e8e8] px-6 py-1 flex-col item-center bg-gray-600 text-white font-semibold">
                                        <span className="text-[14px]">Rekap Bahan</span>
                                    </div>
                                    <div className="border rounded-md mt-1 p-3 border-[#c7c7c7]">
                                        {isLoading ? (
                                            <div className="text-center py-3">
                                                <Typography>Data sedang dimuat...</Typography>
                                            </div>
                                        ) : (

                                            rekap.map((item, index) => (

                                                <div key={index}>
                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                        - {item.nama_bahan}: {item.total_dibutuhkan} {item.satuan} <span className="text-[12px] font-semibold text-red-600">{item.kekurangan_bahan < 0 ? "(Warning! Stok: " + (item.total_dibutuhkan + item.kekurangan_bahan) + " " + item.satuan + ")" : ""}</span>
                                                    </Typography>
                                                </div>

                                            ))
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="w-[60%] max-h-[500px] overflow-auto">
                                <div className="rounded-md border-[#e8e8e8] px-6 py-1 flex-col item-center bg-gray-600 text-white font-semibold">
                                    <span className="text-[14px]">List Pesanan</span>
                                </div>
                                <div className="border rounded-md mt-1 p-3 flex flex-wrap gap-2 border-[#c7c7c7]">
                                    {isLoading ? (
                                        <div className="text-center py-3">
                                            <Typography>Data sedang dimuat...</Typography>
                                        </div>
                                    ) : (
                                        currentRows.map((item, index) => (

                                            <div className="">
                                                <div>
                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                        No Nota: {item.no_transaksi}
                                                    </Typography>
                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                        Nama: {item.nama_lengkap}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                        Tanggal Pesan: {item.tanggal_pesan}
                                                    </Typography>
                                                </div>

                                                <div>
                                                    {item.detail_transaksi.map((detail, index) => (
                                                        <div key={index}>
                                                            {detail.produk.map((produk, produkIndex) => (
                                                                <div key={`${index}-${produkIndex}`}>
                                                                    <Typography className="text-[12px] font-semibold text-blue-gray-600">
                                                                        - ({detail.jumlah_produk}) {produk.nama_produk}
                                                                    </Typography>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>


                                            </div>
                                        ))
                                    )}

                                </div>
                                <div className="rounded-md mt-4 border-[#e8e8e8] px-6 py-1 flex-col item-center bg-gray-600 text-white font-semibold">
                                    <span className="text-[14px]">Kebutuhan Bahan</span>
                                </div>
                                <div className="border rounded-md mt-1 p-3 flex flex-wrap gap-2 border-[#c7c7c7]">
                                    {isLoading ? (
                                        <div className="text-center py-3">
                                            <Typography>Data sedang dimuat...</Typography>
                                        </div>
                                    ) : (

                                        merge.map((mergeItem, idx) => (
                                            <div key={idx} className=" ">
                                                <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                    {mergeItem.nama_produk_stok} ({mergeItem.total_quantity} {mergeItem.satuan})
                                                </Typography>
                                                <div className="pl-4">
                                                    {mergeItem.resep.map((resepItem, id) => (
                                                        <Typography key={id} className="text-[12px] font-semibold text-blue-gray-600">
                                                            - {resepItem.total_dibutuhkan} {resepItem.satuan} {resepItem.nama_bahan}
                                                        </Typography>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}

                                </div>
                            </div>

                        </div>
                        <table className="w-full mt-6 min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["No Transaksi", "Nama Lengkap", "Pesanan", "Status", "Aksi"].map((el) => (
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
                                        <td colSpan={5} className="text-center py-3">
                                            <Typography>Data sedang dimuat...</Typography>
                                        </td>
                                    </tr>
                                ) : (
                                    currentRows.map((item, index) => {
                                        const className = `py-3 px-5 text-center ${index === currentRows.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td className={className}>
                                                        <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                            {item.no_transaksi}
                                                        </Typography>
                                                    </td>
                                                    <td className={className}>
                                                        <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                            {item.nama_lengkap}
                                                        </Typography>
                                                    </td>
                                                    <td className={className}>
                                                        <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                            {item.detail_transaksi.map((detail, index) => (
                                                                <div key={index}>
                                                                    {detail.produk.map((produk, produkIndex) => (
                                                                        <div key={`${index}-${produkIndex}`}>
                                                                            <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                                                ({detail.jumlah_produk}) {produk.nama_produk}
                                                                            </Typography>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </Typography>
                                                    </td>
                                                    <td className="text-[12px] font-semibold text-center text-yellow-600">
                                                        <Chip variant="gradient" value={item.status_transaksi} color="purple" size="sm" />
                                                    </td>
                                                    <td className={className}>
                                                        <div className="flex gap-2 justify-center">
                                                            <Button onClick={() => handleOpenModal(item)} type="submit" className="rounded-md border-[#e8e8e8] px-2 py-1 flex-col item-center hover:bg-blue-200 bg-green-600 text-white font-semibold">
                                                                <span className="text-[12px]">Proses</span>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>

                    </div>
                </>
            )}


            {
                selectedTabMO === "pembayaran valid" && (
                    <table className="w-full -mt-6 min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["No", "No Transaksi", "Nama Lengkap", "Pesanan", "Jumlah", "Status", "Aksi"].map((el) => (
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
                                                <Typography className="text-[14px] font-semibold text-blue-gray-600">
                                                    {item.nama_lengkap}
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
                                                        <Button onClick={() => handleOpenModal(item)} type="submit" className="rounded-md  border-[#e8e8e8] px-2 py-1 flex-col item-center hover:bg-blue-200 bg-green-600 text-white font-semibold">
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
                )
            }
            {

                (selectedTabMO === "diterima" && cekKurang(rekap)) && (
                    <div className="flex justify-end gap-2 mb-4 mx-5">
                        <Button onClick={() => handleBulkTerima()} size="sm" className="bg-green-600 text-white">Proses Semua</Button>
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
                handleBulkTerima={handleBulkTerima}
            />
        </div>
    );
}
