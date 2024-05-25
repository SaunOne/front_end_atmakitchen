import { Card } from "@material-tailwind/react";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import TabHeaders from "@/components/userView/transaction/tab-headers";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '@/context/global_context';
import { CartContext } from "@/context/cart_context";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/context/product_context";

export const Cart = () => {
    // const {user} = useContext(GlobalContext);
    const { cart, total, itemAmount, removeFromCart, increaseAmount, decreaseAmount, clearCart, } = useContext(CartContext);
    const {itemPurchase, setItemPurchase, datePO} = useContext(ProductContext);
    const { selectedTabPesanan } = useContext(GlobalContext);
    const { setIsReady } = useContext(GlobalContext);
    const navigateTo = useNavigate();
    const [tanggalAmbil, setTanggalAmbil] = useState(null)



    useEffect(() => {
        const checkStock = cart.some(item => item.amount > item.jumlah_stok);
        setIsReady(!checkStock);
    }, [cart]);

    console.log(cart);

    function dateHandler(event) {
        const selectedDate = event.target.value;
        setTanggalAmbil(selectedDate);
    }

    function checkoutHandler() {
        const parsedCart = cart.map(({ nama_produk, deskripsi, image_produk, jumlah_stok, amount, ...rest }) => ({
            ...rest,
            jumlah_produk: amount
        }));

        if (tanggalAmbil) {
            parsedCart.tanggal_pengambilan = tanggalAmbil;
        }
        parsedCart.jumlah_pembayaran = total;
        console.log(parsedCart);

        //jika Berhasil
        const parsedPurchase = cart;
        parsedPurchase.jumlah_pembayaran = total;
        tanggalAmbil ? parsedPurchase.tanggal_pengambilan = tanggalAmbil : null;
        setItemPurchase(parsedPurchase);
        console.log(itemPurchase);

        navigateTo("/user/transaksi");
        clearCart();
    }

    return (
        <>
            <div className="p-10 w-full">
                <h1 className="font-bold text-[#4B3D3D] text-[35px]">Keranjang</h1>
                <div className="mt-8 flex gap-8">
                    <div className="w-[65%]">
                        <div className="px-[45px] pb-[45px] bg-white rounded-xl border border-black">
                            <div className="flex gap-4">
                                <h1 className="py-[25px] font-semibold text-[#4B3D3D] text-[20px]">Pesanan</h1>
                                <TabHeaders />
                            </div>
                            {
                                cart.map((item) => (
                                    <div key={item.id_produk} className="flex mt-4 gap-5 border-[#4B3D3D] border-b pb-6">
                                        <img className="w-[120px] h-[120px] rounded-md" src={item.image_produk} alt="gambar" />
                                        <div className="w-full mt-2">
                                            <div className="w-full flex justify-between">
                                                <div>
                                                    <h1 className="text-black text-[20px] font-semibold">{item.nama_produk}</h1>
                                                    <h1 className="text-gray-600 text-[16px] font-light mt-3">{item.jumlah_stok} Ready Stock Tersisa!</h1>
                                                </div>

                                                <h1 className="text-black text-[20px] font-semibold mr-4">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(item.harga * item.amount)}
                                                </h1>
                                            </div>
                                            <div className="mt-[55px] w-full flex justify-end gap-6">
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
                                                    <div className="flex-1 px-2 text-black flex items-center justify-around">
                                                        {item.amount}
                                                    </div>
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

                    <div className="w-[35%]">
                        {
                            selectedTabPesanan === "Pre-Order" && (
                                <div className="mb-8">
                                    <div className="p-8 bg-white rounded-xl border border-black">
                                        <h1 className="text-black text-[20px] font-semibold">Tanggal Pengiriman</h1>
                                        <input onChange={dateHandler} defaultValue={datePO} className="px-3 mt-5 h-9 border-gray-600 border text-black rounded-md w-full" type="date" />
                                    </div>
                                </div>
                            )
                        }
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
