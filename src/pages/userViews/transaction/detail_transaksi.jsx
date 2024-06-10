import { Card, } from "@material-tailwind/react"
import { MapPinIcon } from "@heroicons/react/24/outline"

import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/global_context"
import { ProductContext } from "@/context/product_context"
import { getImage } from "@/api"
import { toast } from 'react-toastify';
import { Checkout } from "@/api/transaksiApi"
import { useNavigate } from "react-router-dom"
import { GetUserProfile } from "@/api/customersApi"

export const DetailTransaksi = () => {
    const { itemPurchase } = useContext(ProductContext);
    const [isError, setIsError] = useState("");
    console.log(itemPurchase);
    const [pengiriman, setPengiriman] = useState("");
    const [rewardPoint, setRewardPoint] = useState(0);
    const [isChecked, setIsChecked] = useState(true);
    const [alamat, setAlamat] = useState({})
    const [reward, setReward] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const navigateTo = useNavigate();

    useEffect(() => {
        let rwd = 0;
        GetUserProfile()
            .then((response) => {
                console.log(response)
                rwd = response.data.jumlah_point;
                console.log(rwd);
                if (rwd * 100 > itemPurchase.jumlah_pembayaran) {
                    setReward(itemPurchase.jumlah_pembayaran / 100);
                } else {
                    setReward(rwd);
                }
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false)
            });


        setAlamat(alamatDummy[0])
    }, [])

    const handlePengirimanChange = (event) => {
        setPengiriman(event.target.value);
        setIsError("");
    };

    const handleReward = (event) => {
        if (isChecked) {
            setRewardPoint(event.target.value)
            setIsChecked(false);
        } else {
            setRewardPoint(0);
            setIsChecked(true);
        }
    };

    const handleAlamatChange = (event) => {
        setAlamat(alamatDummy.filter((item) => item.id_alamat === parseInt(event.target.value))[0])

    }


    const handleTransaksi = () => {
        const parsedTransaksi = {};
        console.log(itemPurchase);
        parsedTransaksi.jenis_pesanan = itemPurchase.jenis_pesanan
        parsedTransaksi.tanggal_pengambilan = itemPurchase.tanggal_pengambilan
        parsedTransaksi.detail_transaksi = itemPurchase.detail_transaksi
        parsedTransaksi.total_harga_transaksi = itemPurchase.jumlah_pembayaran - rewardPoint*100
        parsedTransaksi.point_terpakai = rewardPoint
        if (pengiriman) {
            if (pengiriman === "Atma Kitchen Delivery") {
                console.log(alamat)
                parsedTransaksi.id_alamat = alamat.id_alamat
                parsedTransaksi.status = "menunggu biaya pengiriman"
                parsedTransaksi.jenis_pengiriman = "Atma Kitchen Delivery"
            } else if(pengiriman === "Gosend") {
                parsedTransaksi.status = "menunggu pembayaran"
                parsedTransaksi.jenis_pengiriman = "Gosend"
            } else {
                parsedTransaksi.status = "menunggu pembayaran"
                parsedTransaksi.jenis_pengiriman = "Pick Up"
            }
        } else {
            setIsError("Pengiriman wajib dipilih!")
            toast.error('Pengiriman wajib dipilih!')
        }
        console.log(parsedTransaksi);
        Checkout(parsedTransaksi)
            .then((response) => {
                console.log(response)
                toast.success('Pesanan berhasil dibuat.')
                navigateTo("/user/profile/")
            })
            .catch((err) => {
                console.log("masuk sini" + err);
                console.error(err);
            });

        return;

    }

    const alamatDummy = [
        {
            id_alamat: 1,
            kecamatan: "Depok",
            kabupaten: "Sleman",
            provinsi: "DIY",
            detail_alamat: "Jln. Kaliurang Km 5 No 5",
        },
        {
            id_alamat: 2,
            kecamatan: "Godean",
            kabupaten: "Sleman",
            provinsi: "DIY",
            detail_alamat: "Jln. Gatot Subroto No 5",
        },
    ]

    return <>
        <div className="p-10 w-full">
            <h1 className="font-bold text-[#4B3D3D] text-[35px]">Detail Pesanan</h1>
            <div className="mt-8 md:flex gap-8">
                <div className="md:w-[65%]  w-full ">
                    <div className=" bg-white rounded-xl border border-black">

                        {itemPurchase.detail_transaksi.map((item) =>
                            <div key={item.id_produk} className="px-[45px] pb-[45px] py-7 flex gap-5 border-[#4B3D3D] border-b ">
                                <img className="w-[120px] h-[120px] rounded-md" src={getImage(item.image_produk)} alt="" />
                                <div className=" w-full mt-2">
                                    <div className="w-full flex justify-between">
                                        <h1 className="text-black text-[20px] font-semibold ">{item.nama_produk}</h1>
                                        <div className="flex gap-2 ">
                                            <h1 className="text-black text-[20px] font-semibold mr-4  ">{item.jumlah_produk}x </h1>
                                            <h1 className="text-black text-[20px] font-semibold mr-4  ">
                                                {new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(item.harga * item.jumlah_produk)}
                                            </h1>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )}


                    </div>
                </div>
                <div className=" md:w-[35%] w-full">
                    <div className="p-8 bg-white rounded-xl border border-black">
                        <h1 className="text-black text-[20px] font-semibold ">Ringkasan Belanja</h1>
                        <div className="flex justify-between">
                            <h1 className="text-[#675757] text-[16px] font-semibold mt-6">Total Harga Produk : </h1>
                            <h1 className="text-[#675757] text-[16px] font-semibold mt-6">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(itemPurchase.jumlah_pembayaran)}
                            </h1>
                        </div>
                        <div className="flex justify-between">
                            <h1 className="text-[#675757] text-[16px] font-semibold mt-3">Potongan Reward Point : </h1>
                            <h1 className="text-[#675757] text-[16px] font-semibold mt-3"> Rp -{rewardPoint * 100}</h1>
                        </div>
                        <div className="flex justify-between border-b border-[#4B3D3D] pb-8">
                            <h1 className="text-black text-[16px] font-semibold mt-7">Total Belanja : </h1>
                            <h1 className="text-black text-[22px] font-bold mt-7   ">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(itemPurchase.jumlah_pembayaran - (rewardPoint*100))}
                            </h1>

                        </div>


                        {!isLoading && (
                            <div className="flex gap-3 ">
                                <input name="reward" value={reward} onChange={handleReward} className="mt-7 w-[20px] h-[20px]" type="checkbox" />
                                <h1 className="text-[#675757] text-[15px] font-semibold mt-7   ">Gunakan Reward Point ({reward})</h1>
                            </div>

                        )
                        }



                        <button className="bg-[#784100] rounded-[20px] w-full p-3 mt-7" onClick={handleTransaksi}>
                            <h1 className="text-white text-[20px] font-semibold ">Buat Pesanan</h1>
                        </button>

                    </div>

                    <h1 className="font-bold mt-8 text-[#4B3D3D] text-[25px]"> Pilih Pengiriman</h1>

                    <div className="mt-4 p-8 bg-white rounded-xl border border-black">
                        <div className="pb-5 border-b border-[#acacac]">
                            <select
                                name="pengiriman"
                                size="lg"
                                className="  p-2 rounded-xl   border-[#acacac] border-[1px] text-white h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                value={pengiriman}
                                onChange={handlePengirimanChange}
                                style={{ backgroundColor: '#784100' }}
                            >
                                <option className="bg-white text-black" value="" disabled>Pilih Pengiriman</option>
                                <option className="bg-white text-black flex gap-2" value="Atma Kitchen Delivery"  >Atma Kitchen Delivery</option>
                                <option className="bg-white text-black flex gap-2" value="Ambil Sendiri"  >Ambil Sendiri</option>
                                <option className="bg-white text-black flex gap-2" value="Gosend"  >Gosend</option>
                            </select>
                        </div>

                        {
                            pengiriman === "Atma Kitchen Delivery" && (
                                <div className="mt-4">
                                    <h1 className="text-[#675757] text-[15px] font-semibold">Alamat Pengiriman</h1>
                                    <div className="mt-5 flex gap-4">
                                        <MapPinIcon className="w-7 h-7 text-black" />
                                        <div>
                                            <h1 className="text-black text-[17px] font-semibold">{alamat.kecamatan}, {alamat.kabupaten}, {alamat.provinsi}</h1>
                                            <h1 className="text-black text-[17px] mt-3 font-normal">{alamat.detail_alamat}</h1>
                                        </div>
                                    </div>
                                    <select
                                        name="alamat"
                                        size="lg"
                                        className=" mt-5 p-2  rounded-full  border-[#acacac] border-[1px] h-10 text-black placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                        // value={alamat}
                                        onChange={handleAlamatChange}

                                    >
                                        <option className="bg-white text-black" value="" disabled selected>Ganti Alamat</option>
                                        {alamatDummy.map((item) => (
                                            <option className="bg-white text-black flex gap-2" value={item.id_alamat} >{item.detail_alamat}</option>
                                        ))}

                                    </select>
                                </div>
                            )
                        }
                        {
                            pengiriman === "Ambil Sendiri" || pengiriman === "Gosend" && (
                                <div className="mt-4">
                                    <h1 className="text-[#675757] text-[15px] font-semibold">Alamat Ambil</h1>
                                    <div className="mt-5 flex gap-4">
                                        <MapPinIcon className="w-7 h-7 text-black" />
                                        <div>
                                            <h1 className="text-black text-[17px] font-semibold">Depok, Sleman, Daerah Istimewa Yogyakarta</h1>
                                            <h1 className="text-black text-[17px] mt-3 font-normal">Jl Babarsari No 3</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {isError && <h1 className="text-red-500 text-[15px] font-semibold mt-4">{isError}</h1>}
                    </div>
                </div>
            </div>

        </div>

    </>
}
