import { Card, Typography, CardBody, CardHeader, Button, CardFooter } from "@material-tailwind/react"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "@/context/product_context";
import { CartContext } from "@/context/cart_context";
import { useNavigate, useParams } from "react-router-dom";
import { getImage } from "@/api";
import { toast } from 'react-toastify';

export const ListProduct = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { products, setProducts, datePO, isLoadingProduct } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const { jenis } = useParams();
    const navigateTo = useNavigate();


    console.log(products.update_at)


    const fetchFilteredProducts = async () => {
        try {
            setIsLoading(true);

            // Wait for isLoadingProduct to be false
            while (isLoadingProduct) {
                await new Promise(resolve => setTimeout(resolve, 300)); // Wait for 100 milliseconds
            }

            // Simulate a fetch call or any async operation

            if (jenis) {
                console.log(jenis);


                if (jenis === "hampers" || jenis === "titipan") {
                    const filtered = products.filter((item) => {
                        return item.hasOwnProperty('jenis_produk') && item.jenis_produk === jenis;
                    });
                    setFilteredProducts(filtered);
                } else {
                    const filtered = products.filter((item) => {
                        return item.hasOwnProperty('kategori_produk') && item.kategori_produk === jenis;
                    });
                    console.log(filtered)
                    setFilteredProducts(filtered);

                }

            } else {
                setFilteredProducts(products);
            }

            console.log(filtered)


        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoadingProduct) {
            fetchFilteredProducts();
        }
    }, [isLoadingProduct, datePO, jenis]);

    function addCart(product, id) {
        addToCart(product, id);
        toast.success('Produk berhasil ditambahkan ke keranjang')
    }

    return (
        <>
            {isLoading ? (
                <Typography className="text-center text-[20px] text-black mt-8">Loading...</Typography>
            ) : (
                <div className="mt-8 flex flex-wrap gap-7 justify-center">
                    {filteredProducts.map((item, index) => (
                        <Card key={index} className="w-[270px] p-0">
                            <img
                                src={getImage(item.image_produk)}
                                alt="card-image"
                                className="rounded-lg h-[200px]"
                            />
                            <CardBody>
                                <Typography variant="h2" color="blue-gray" className="mb-2 h-[20px] overflow-y-auto text-[17px]">
                                    {item.nama_produk}
                                </Typography>
                                <Typography variant="h5" color="blue-gray" className="mb-2 flex gap-3">
                                    <p className="font-semibold text-[14px] mt-[2px]">
                                        {item.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </p>
                                </Typography>
                                {item.jenis_produk !== "Titipan" && (
                                    <Typography variant="h5" color="blue-gray" className="mb-2 flex gap-3">
                                        <p className="font-semibold text-gray-600 text-[12px] mt-[2px]">Kuota hari ini: {item.jumlah_sisa}</p>
                                    </Typography>
                                )}
                                {item.jenis_produk === "Titipan" && (
                                    <Typography variant="h5" color="blue-gray" className="mb-2 flex gap-3">
                                        <p className="font-semibold text-gray-600 text-[12px] mt-[2px]">Produk tersedia: {item.jumlah_stok}</p>
                                    </Typography>
                                )}

                                <Typography className="text-[14px] h-[100px] overflow-hidden">
                                    {item.deskripsi}
                                </Typography>
                                <Typography className="text-[11px] mt-3 text-gray-400">
                                    Diperbaharui {filteredProducts.update_at}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0 flex justify-around gap-[90px]">
                                <Button
                                    className="rounded-xl w-[125px] bg-[#675757] h-[30px] text-[12px] p-1"
                                    onClick={() => navigateTo(`/product/detail/${item.id_produk}`)}
                                >
                                    Lihat Detail
                                </Button>
                                <button className="rounded-full bg-[#675757] p-2" onClick={() => addCart(item, item.id_produk)}>
                                    <ShoppingCartIcon className="h-5 w-5 text-white font-bold" />
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
