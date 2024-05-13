import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/context';
import Search from "@/components/userView/search";
import StatusFilter from "@/components/userView/profile/statusFilter";
import DropdownProduct from "@/components/userView/profile/dropdownProduct";
import { GetAllTransaksi } from "@/api/customersApi";

export default function Page() {
    const { user } = useContext(GlobalContext);
    console.log(user);
    const [data, setData] = useState([]);

    useEffect(() => {
        GetAllTransaksi()
            .then((response) => {
                console.log(response.data[0].detail_transaksi[0].produk.nama_produk);
                
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
      }, []);
    
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

            <div className="bg-white mt-6 h-[480px] rounded-md p-6 ">
                <div className="rounded-md border border-gray-400 p-4 ">
                    {data.map((item) => (
                        <div key={item.id_transaksi}>
                            <div className="flex justify-between w-full">
                                <div className="w-[75%]">
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">No Pesanan : {item.id_transaksi}</h1>
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[13px]">
                                        Tanggal Pesan {item.tanggal_pesan} -
                                        Ambil {item.tanggal_pengambilan}
                                    </h1>
                                </div>

                                <div>
                                    <h1 className="border-l pl-3 mr-3  border-gray-400 text-gray-800 mb-3 font-semibold text-[17px]">{item.status_transaksi}</h1>
                                </div>
                            </div>
                            <div className="flex justify-start gap-5 w-full mt-3">
                                <img src={user.pesanan[0].produk[0].gambar} className="w-[120px] h-[120px] rounded" alt="" />
                                <div className="w-[45%]">
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{item.detail_transaksi[0].produk.nama_produk}</h1>
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[17px]">{item.detail_transaksi[0].jumlah_produk}x</h1>
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[17px] mt-7">{item.detail_transaksi[0].produk.harga}</h1>
                                </div>
                                <div>
                                    <h1 className="text-gray-800 mb-3 font-semibold text-[16px] mt-[50px]">Total Pesanan {item.total_harga_transaksi}</h1>
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
        </div>
    );
}