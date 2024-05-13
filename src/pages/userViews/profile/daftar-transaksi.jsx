import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/context';
import Search from "@/components/userView/search";
import StatusFilter from "@/components/userView/profile/statusFilter";
import DropdownProduct from "@/components/userView/profile/dropdownProduct";
import { GetAllUserTransaction } from "@/api/transaksiApi";
import { getImage } from "@/api/index";

export default function Page() {
    const { user, search } = useContext(GlobalContext);

    const [data, setData] = useState([]);


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





    console.log(user);


    return (
        <div className=" px-8 ">
            <h1 className="text-gray-800 mt-5 mb-3 font-bold text-[30px]">Daftar Transaksi</h1>

            <div className="ml-8 relative mt-6 flex justify-start gap-3 flex-1 flex-shrink-0">
                <Search placeholder="Cari transaksi" />
                <DropdownProduct />
            </div>

            <div className="ml-8 relative mt-3 flex justify-start gap-6 ">
                <StatusFilter />
            </div>

            <div className="bg-white mt-6 h-full rounded-md p-6 ">
                {data.filter((el) => {
                    const lowerCaseSearch = search.toLowerCase();
                    return (
                        lowerCaseSearch === "" ||
                        el.detail_transaksi[0].produk.nama_produk.toLowerCase().includes(lowerCaseSearch)
                    );

                }).map((user, index) => (
                    <div key={user.id} className="mb-3 rounded-md border border-gray-400 p-4 ">
                        <div className="flex justify-between w-full">
                            <div className="w-[75%]">
                                <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">No Pesanan :  {user.id_transaksi}</h1>
                                <h1 className="text-gray-800 mb-3 font-semibold text-[13px]">
                                    Tanggal Pesan {new Date(user.tanggal_pesan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} -
                                    Ambil {new Date(user.tanggal_pengambilan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </h1>
                            </div>
                            <div>
                                <h1 className="border-l pl-3 mr-3  border-gray-400 text-gray-800 mb-3 font-semibold text-[17px]">Selesai</h1>
                            </div>
                        </div>
                        <div className="flex justify-start gap-5 w-full mt-3">

                            <img src={getImage(user.detail_transaksi[0].produk.image_produk)} className="w-[120px] h-[120px] rounded" alt="" />
                            <div className="w-[45%]">
                                <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{user.detail_transaksi[0].produk.nama_produk}</h1>
                                <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{user.detail_transaksi[0].jumlah_produk}x</h1>
                                <h1 className="text-gray-800 mb-3 font-semibold text-[17px] mt-7">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user.detail_transaksi[0].produk.harga * user.detail_transaksi[0].jumlah_produk)}</h1>
                            </div>


                            <div>
                                <h1 className="text-gray-800 mb-3 font-semibold text-[16px] mt-[50px]">Total Pesanan {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user.total_harga_transaksi)}</h1>
                                <div className="flex justify-end">
                                    <button className="bg-gray-800 p-2">
                                        <h1 className="text-white font-semibold text-[14px]  ">Detail Pesanan</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>


        </div>
    );
}