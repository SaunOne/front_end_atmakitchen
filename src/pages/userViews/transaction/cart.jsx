
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import TabHeaders from "@/components/userView/transaction/tab-headers";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '@/context/global_context';
import { CartContext } from "@/context/cart_context";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/context/product_context";
import { CheckStock } from "@/api/transaksiApi";
import { getImage } from "@/api";
import { toast } from 'react-toastify';
import { setDate } from "date-fns";

export const Cart = () => {
    const { cart, total, itemAmount, removeFromCart, increaseAmount, decreaseAmount, clearCart, setCart } = useContext(CartContext);
    const { itemPurchase, setItemPurchase, datePO, setDatePO } = useContext(ProductContext);
    const { selectedTabPesanan } = useContext(GlobalContext);
    const { setIsReady } = useContext(GlobalContext);
    const [isError, setIsError] = useState("")
    const navigateTo = useNavigate();
    const [tanggalAmbil, setTanggalAmbil] = useState(datePO)

    useEffect(() => {
        const checkStock = cart.some(item => item.amount > item.jumlah_stok);
        setIsReady(!checkStock);
    }, [cart]);

    console.log(cart);

    const minDateString = (() => {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 3);
        return minDate.toISOString().split('T')[0];
    })();

    function dateHandler(event) {
        const selectedDate = event.target.value;
        setTanggalAmbil(selectedDate);
    }

    function checkoutHandler() {

        const parsedCart = {};
        // Map the cart items to convert amount to jumlah_produk
        parsedCart.detail_transaksi = cart
        if (tanggalAmbil) {
            parsedCart.tanggal_pengambilan = tanggalAmbil;
        }

        parsedCart.jumlah_pembayaran = total;
        parsedCart.jenis_pesanan = selectedTabPesanan.toLowerCase();
        // parsedCart.total_harga_transaksi = total;

        console.log(parsedCart);

        if (selectedTabPesanan === "Pre-Order" && !tanggalAmbil) {
            setIsError("Wajib mengisi tanggal pengambilan!")
            toast.error('Wajib mengisi tanggal pengambilan!')
            //buatlah agar tetap mempertahankan state cart
            return;
        } else {
            CheckStock(parsedCart)
                .then((response) => {
                    console.log(response)
                    console.log(response.status);
                    let status = true;
                    const date = datePO;

                    response.message.forEach(produk => {
                        if (produk.status === false) {
                            return status = false;
                        }
                    });

                    if (status === false) {
                        console.log(response.message)

                        response.message.forEach(produk => {
                            if (typeof produk.jumlah_produk === 'string') {
                                produk.jumlah_produk = parseInt(produk.jumlah_produk, 10);
                            }
                        });
                        setCart(response.message);
                        setDatePO(date);
                        toast.error('Jumlah melebihi stok atau kuota harian produk yang tersedia!')

                    } else {
                        toast.success('Pesanan berhasil dibuat, lengkapilah detail pesanan!')
                        setItemPurchase(parsedCart);
                        clearCart();
                        navigateTo("/user/transaksi");

                    }

                })
                .catch((err) => {
                    console.log("masuk sini" + err);
                    console.error(err);
                });

            return;
        }
    }

    return (
        <>
            <div className="p-10 w-full">
                <h1 className="font-bold text-[#4B3D3D] text-[35px]">Keranjang</h1>
                <div className="mt-8 md:flex gap-8">
                    <div className="md:w-[65%] w-full">
                        <div className="px-[45px] pb-[45px] bg-white rounded-xl border border-black">
                            <div className="md:flex gap-4">
                                <h1 className="py-[25px] font-semibold text-[#4B3D3D] text-[20px]">Pesanan</h1>
                                <TabHeaders />
                            </div>
                            {
                                cart.map((item) => (
                                    <div key={item.id_produk} className="md:flex mt-4 gap-5 border-[#4B3D3D] border-b pb-6">
                                        <img className="w-[120px] h-[120px] rounded-md" src={getImage(item.image_produk)} alt="gambar" />
                                        <div className="w-full mt-2">
                                            <div className="w-full md:flex justify-between">
                                                <div>
                                                    <h1 className="text-black text-[20px] font-semibold">{item.nama_produk}</h1>
                                                    {(selectedTabPesanan === "Ready Stock" || item.jenis_produk == "Titipan") && (
                                                        <h1 className="text-gray-600 text-[16px] font-light mt-3">{item.jumlah_stok} Ready Stok tersisa!</h1>
                                                    )}
                                                    {(selectedTabPesanan === "Pre-Order" && item.jenis_produk !== "Titipan") && (
                                                        <h1 className="text-gray-600 text-[16px] font-light mt-3">{item.jumlah_sisa} Kuota Pre-order tersisa!</h1>
                                                    )}


                                                </div>
                                                {
                                                    item.jumlah_produk && (
                                                        <h1 className="text-black text-[20px] font-semibold mr-4">
                                                            {new Intl.NumberFormat("id-ID", {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }).format(item.harga * item.jumlah_produk)}
                                                        </h1>
                                                    )
                                                }

                                            </div>
                                            <div className="mt-[55px] w-full md:flex justify-end gap-6">
                                                <div
                                                    onClick={() => removeFromCart(item.id_produk)}
                                                    className="cursor-pointer py-4 rounded bg-transparent text-black flex justify-center items-center text-xl"
                                                >
                                                    <TrashIcon className="w-[30px] h-[30px]" />
                                                </div>
                                                <div className="flex mt-3 flex-1 p-2 max-w-[120px] items-center h-full border text-primary font-medium">
                                                    <div
                                                        onClick={() => decreaseAmount(item.id_produk)}
                                                        className="flex-1 px-2 text-black h-full flex justify-center items-center cursor-pointer"
                                                    >
                                                        <MinusIcon className="w-6" />
                                                    </div>
                                                    {
                                                        item.jumlah_produk && (
                                                            <div className="flex-1 px-2 text-black flex items-center justify-around">
                                                                {item.jumlah_produk}
                                                            </div>
                                                        )
                                                    }

                                                    <div
                                                        onClick={() => increaseAmount(item.id_produk)}
                                                        className="flex-1 px-2 text-black h-full flex justify-center items-center cursor-pointer"
                                                    >
                                                        <PlusIcon className="w-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="md:w-[35%] w-full">
                        {
                            selectedTabPesanan === "Pre-Order" && (
                                <div className="mb-8">
                                    <div className="p-8 bg-white rounded-xl border border-black">
                                        <h1 className="text-black text-[20px] font-semibold">Tanggal Ambil</h1>
                                        <input onChange={dateHandler} min={minDateString} defaultValue={datePO} required className="px-3 mt-5 h-9 border-gray-600 border text-black rounded-md w-full" type="date" />
                                        {isError && (
                                            <h1 className="mt-5 text-[#e13737] text-[14px] font-semibold">{isError}</h1>
                                        )}

                                    </div>

                                </div>
                            )}

                        <div className="p-8 bg-white rounded-xl border border-black">
                            <h1 className="text-black text-[20px] font-semibold">Total Harga</h1>
                            <h1 className="text-black text-[22px] font-bold mt-5 pb-8 border-b border-[#4B3D3D]">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(total)}
                            </h1>
                            <button onClick={() => checkoutHandler()} className="bg-[#675757] rounded-[20px] w-full p-3 mt-7">
                                <h1 className="text-white text-[20px] font-semibold">({itemAmount}) Pesan</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
