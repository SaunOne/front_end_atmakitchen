import { TabHeaderProduk } from "@/components/userView/transaction/tab-headers";
import { ShoppingCartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "@/context/product_context";
import { CartContext } from "@/context/cart_context";

export default function DetailProduk() {
    const { products } = useContext(ProductContext);
    const { addToCartWithAmount } = useContext(CartContext);
    const [isReady, setIsReady] = useState(true);
    const [amount, setAmount] = useState(1);

    const { id } = useParams();

    const dataProduk = products.find((item) => {
        return item.id_produk === parseInt(id);
    });
    

    useEffect(() => {
        if (dataProduk) {
            amount > dataProduk.jumlah_stok ? setIsReady(false) : setIsReady(true);
        }
    }, [amount, dataProduk]);

    if (!dataProduk) {
        return (
            <section className="h-screen flex justify-center items-center">
                Loading...
            </section>
        );
    }

    function addCart(product, id) {
        addToCartWithAmount(product, id, amount);
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    const increaseAmount = () => {
        setAmount(amount + 1);
    };

    return (
        <div className="w-full md:px-24 px-12 pb-24 pt-10">
            <h1 className="text-[30px] font-bold text-[#4B3D3D]">{dataProduk.nama_produk}</h1>
            <div className="mt-8 md:flex">
                <div className="md:w-[60%] w-full">
                    <img className="w-[550px] h-[350px] rounded-md" src={dataProduk.image_produk} alt="" />
                </div>
                <div className="md:w-[35%] w-full md:ml-10 md:mt-0 mt-8 border-gray-600 border rounded-xl p-10">
                    <h1 className="text-[25px] font-bold text-[#4B3D3D]">Atur Jumlah</h1>
                    <div className="w-[80%]">
                        { dataProduk.jenis_produk !== "Titipan"  && (<TabHeaderProduk openReady={isReady} />)}
                    </div>
                    <div className="mt-3 w-full flex gap-6">
                        <div className="flex mt-3 flex-1 p-2 max-w-[180px] bg-[#FFF9ED] items-center h-full border rounded-lg text-primary font-medium">
                            <div
                                onClick={decreaseAmount}
                                className="flex-1 px-2 text-black h-full flex justify-center items-center cursor-pointer"
                            >
                                <MinusIcon className="w-6" />
                            </div>
                            <div className="flex-1 border-x border-gray-400 text-black flex items-center justify-around">
                                {amount}
                            </div>
                            <div
                                onClick={increaseAmount}
                                className="flex-1 px-2 text-black h-full flex justify-center items-center cursor-pointer"
                            >
                                <PlusIcon className="w-6" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-[15px] mt-4 ml-3 font-light text-gray-600 flex gap-2">{dataProduk.jumlah_stok} Produk Ready Stock Tersisa</h1>
                    <h1 className="text-[18px] mt-4 ml-6 font-semibold text-[#4B3D3D]">Subtotal</h1>
                    <h1 className="text-[25px] mt-1 ml-6 font-bold text-[#4B3D3D]">
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(dataProduk.harga * amount)}
                    </h1>
                    <div className="flex mt-9">
                        <button onClick={() => addCart(dataProduk, dataProduk.id_produk)} className="bg-[#784100] flex gap-2 rounded-[15px] px-5 py-2 text-white text-[14px] font-semibold">
                            <ShoppingCartIcon className="h-6 w-6 text-white font-bold" />Tambahkan Keranjang
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-[25px] font-bold text-[#675757]">Deskripsi</h1>
                <p className="text-[18px] mt-3 text-gray-800 font-semibold">{dataProduk.deskripsi}</p>
            </div>
        </div>
    );
}
