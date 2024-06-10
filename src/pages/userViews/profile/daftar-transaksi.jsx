import { Chip } from "@material-tailwind/react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '@/context/global_context';
import Search from "@/components/userView/search";
import StatusFilter from "@/components/userView/profile/statusFilter";
import DropdownProduct from "@/components/userView/profile/dropdownProduct";
import { BayarPesanan, GetAllUserTransaction, BatalTransaksi, KonfirmasiCustomer } from "@/api/transaksiApi";
import { getImage } from "@/api/index";
import NotaModal from "@/components/layouts/nota-modal";
import BayarModal from "@/components/layouts/bayar-modal";
import { parse, set } from "date-fns";
import { pembayaranCustomer } from "@/validations/validation";
import { toast } from "react-toastify";
import SelesaiModal from "@/components/layouts/selesai-modal";

export default function Page() {
    const navigateTo = useNavigate();
    const { search } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const [isBayarModalOpen, setIsBayarModalOpen] = useState(false);
    const toggleBayarModal = () => {
        setIsBayarModalOpen(!isBayarModalOpen);
    };

    const [isNotaModalOpen, setIsNotaModalOpen] = useState(false);
    const [currentTransactionId, setCurrentTransactionId] = useState(null);

    const toggleNotaModal = (id_transaksi, no_transaksi) => {
        setCurrentTransactionId(id_transaksi);
        setIsNotaModalOpen(!isNotaModalOpen);
        console.log("id_transaksi :", id_transaksi);
    };

    const [isSelesaiModalOpen, setIsSelesaiModalOpen] = useState(false);
    const toggleSelesaiModal = (id_transaksi) => {
        setIsSelesaiModalOpen(true);
        setCurrentTransactionId(id_transaksi);
    };

    const handleUpdateStatus = (data) => {
        data.id_transaksi = currentTransactionId;
        console.log(data.id_transaksi);
        KonfirmasiCustomer(data.id_transaksi)
            .then((response) => {
                console.log(response);
                setIsSelesaiModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.error(err);
            });
    };


    useEffect(() => {
        GetAllUserTransaction()
            .then((response) => {
                console.log(response)
                setData(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedPembayaran = pembayaranCustomer.safeParse(formDataObject);

        if (!parsedPembayaran.success) {
            const error = parsedPembayaran.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            console.log(newErrors);
            console.log(parsedPembayaran);
            return setFormErrors(newErrors);
        } else {
            parsedPembayaran.data.id_transaksi = currentTransactionId;
            BayarPesanan(parsedPembayaran.data)
                .then((response) => {
                    console.log(response);
                    // setSuccess({ bool: true, message: 'Bukti Pembayaran berhasil ditambahkan' });
                    toast.success('Bukti Pembayaran berhasil ditambahkan');
                    setIsBayarModalOpen(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                })
                .catch((err) => {
                    console.error(err);
                });
        }
        setFormErrors({});
    };

    const handleOpenModal = (id_transaksi) => {
        setIsBayarModalOpen(true);
        setCurrentTransactionId(id_transaksi);
    };

    const handleCloseModal = () => {
        setIsBayarModalOpen(false);
        setIsSelesaiModalOpen(false);
    };

    return (
        <div className="">
            <h1 className="text-gray-800 mt-5 mb-3 font-bold text-[30px]">Daftar Transaksi</h1>

            <div className="ml-8 relative mt-6 flex justify-start gap-3 flex-1 flex-shrink-0">
                <Search placeholder="Cari transaksi" />
            </div>

            <div className="ml-8 relative mt-3 flex justify-start gap-6 ">
                <StatusFilter />
            </div>

            <div className="bg-white mt-6 h-full rounded-md p-6 overflow-y-auto">
                {data.filter((el) => {
                    const lowerCaseSearch = search.toLowerCase();
                    return (
                        lowerCaseSearch === "" ||
                        (el.detail_transaksi && el.detail_transaksi.length > 0 && el.detail_transaksi[0].produk.nama_produk.toLowerCase().includes(lowerCaseSearch))
                    );
                }).map((user, index) => (
                    <div key={user.id} className="mb-3 rounded-md border border-gray-400 p-4">
                        <div className="flex justify-between w-full">
                            <div className="w-[75%]">
                                <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">No Pesanan :  {user.id_transaksi}</h1>
                                <h1 className="text-gray-800 mb-3 font-semibold text-[13px]">
                                    Tanggal Pesan {new Date(user.tanggal_pesan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} -
                                    Ambil {new Date(user.tanggal_pengambilan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </h1>
                            </div>
                            <div>
                                {
                                    (
                                        user.status_transaksi === "diproses" ||
                                        user.status_transaksi === "menunggu biaya pengiriman" ||
                                        user.status_transaksi === "sudah dibayar"
                                    ) && (
                                        <Chip variant="ghost" size="sm" value={user.status_transaksi} />
                                    )
                                }
                                {
                                    user.status_transaksi === "menunggu pembayaran" && (
                                        <Chip variant="ghost" color="blue" size="sm" value={user.status_transaksi} />
                                    )
                                }
                                {
                                    (user.status_transaksi === "selesai"
                                    ) && (
                                        <Chip color="green" size="sm" value={user.status_transaksi} />
                                    )
                                }
                                {
                                    (user.status_transaksi === "ditolak" ||
                                        user.status_transaksi === "pembayaran tidak valid" ||
                                        user.status_transaksi === "dibatalkan"
                                    ) && (
                                        <Chip color="red" size="sm" value={user.status_transaksi} />
                                    )
                                }
                                {
                                    (user.status_transaksi === "dikirim kurir" ||
                                        user.status_transaksi === "siap dipick-up" ||
                                        user.status_transaksi === "sudah dipick-up"
                                    ) && (
                                        <Chip color="indigo" size="sm" value={user.status_transaksi} />
                                    )
                                }
                                {
                                    (user.status_transaksi === "diterima" ||
                                        user.status_transaksi === "pembayaran valid"
                                    ) && (
                                        <Chip color="teal" size="sm" value={user.status_transaksi} />
                                    )
                                }


                            </div>
                        </div>
                        <div className="flex justify-start gap-5 w-full mt-3">
                            {user.detail_transaksi && user.detail_transaksi.length > 0 && user.detail_transaksi[0].produk && (
                                <>
                                    <img src={getImage(user.detail_transaksi[0].produk.image_produk)} className="w-[120px] h-[120px] rounded" alt="" />
                                    <div className="w-[45%]">
                                        <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{user.detail_transaksi[0].produk.nama_produk}</h1>
                                        <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{user.detail_transaksi[0].jumlah_produk}x</h1>
                                        <h1 className="text-gray-800 mb-3 font-semibold text-[17px] mt-7">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user.total_harga_transaksi)}</h1>
                                    </div>
                                </>
                            )}
                            {/* Tambahkan penanganan jika detail transaksi tidak tersedia */}
                            {!user.detail_transaksi || user.detail_transaksi.length === 0 || !user.detail_transaksi[0].produk && (
                                <div className="w-[165px] flex justify-center items-center">
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">Produk Tidak Tersedia</h1>
                                </div>
                            )}
                            <div className="ml-auto flex flex-col justify-end items-end">
                                {/* Tambahkan penanganan jika detail transaksi tidak tersedia */}
                                {!user.detail_transaksi || user.detail_transaksi.length === 0 || !user.detail_transaksi[0].produk && (
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[16px] mt-[50px]">Total Pesanan {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user.total_harga_transaksi)}</h1>
                                )}
                                <div className="flex justify-end">
                                    <button className="bg-gray-800 p-2" >
                                        <h1 className="text-white font-semibold text-[14px]">
                                            Detail
                                        </h1>
                                    </button>
                                    {(user.status_transaksi === "menunggu pembayaran" ) && (
                                        <div className="mx-2">
                                            <button onClick={() => toggleNotaModal(user.id_transaksi, user.no_transaksi)} className="text-white font-semibold text-[14px] bg-gray-800 p-2 hover:text-gray-200">
                                                Detail 
                                            </button>
                                        </div>
                                    )}
                                    {( user.status_transaksi === "diproses" || user.status_transaksi === "pembayaran valid" || user.status_transaksi === "diterima" || user.status_transaksi === "dikirim kurir" || user.status_transaksi === "siap dipick-up" || user.status_transaksi === "sudah dipick-up" || user.status_transaksi === "selesai") && (
                                        <div className="mx-2">
                                            <button onClick={() => toggleNotaModal(user.id_transaksi, user.no_transaksi)} className="text-white font-semibold text-[14px] bg-blue-800 p-2 hover:text-gray-200">
                                                Nota
                                            </button>
                                        </div>
                                    )}
                                    {(user.status_transaksi === "menunggu pembayaran") && (
                                        <button className="bg-gray-800 p- mr-3" onClick={() => handleOpenModal(user.id_transaksi)}>
                                            <h1 className="text-white font-semibold text-[14px]">
                                                {user.status_transaksi === "menunggu pembayaran" ? "Bayar" : null}
                                            </h1>
                                        </button>
                                    )}
                                    {(user.status_transaksi === "dikirim kurir" || user.status_transaksi === "sudah dipick-up") && (
                                        <div className="">
                                            <button onClick={() => toggleSelesaiModal(user)} className="text-white font-semibold text-[14px] bg-green-500 p-2 hover:text-gray-200">
                                                Selesai
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isNotaModalOpen && <NotaModal isOpen={isNotaModalOpen} toggleModal={toggleNotaModal} notaId={currentTransactionId} />}
            {isBayarModalOpen && <BayarModal isOpen={isBayarModalOpen} toggleModal={toggleBayarModal} onSubmit={handleSubmit} formErrors={formErrors} />}
            <SelesaiModal
                isOpen={isSelesaiModalOpen}
                onClose={handleCloseModal}
                updateStatus={handleUpdateStatus}
            />
        </div>
    );
}