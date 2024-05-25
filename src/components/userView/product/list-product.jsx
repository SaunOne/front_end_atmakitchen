import { Card, Typography, CardBody, CardHeader, Button, CardFooter } from "@material-tailwind/react"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "@/context/product_context";
import { CartContext } from "@/context/cart_context";
import { useNavigate, useParams } from "react-router-dom";
export const ListProduct = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { products, setProducts, datePO, isLoadingProduct } = useContext(ProductContext);
    console.log(products);
    const { addToCart } = useContext(CartContext);
    const { jenis } = useParams();
    console.log(jenis);




    const jenisLowerCase = jenis ? jenis.toLowerCase() : "";

    console.log(datePO);

    const fetchFilteredProducts = async () => {
        try {
            setIsLoading(true);

            while (isLoadingProduct) {
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
            }
            // Simulate a fetch call or any async operation
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log(datePO);

            if (datePO) {
                console.log("masuk");
                setProducts([{nama_produk: "Produk 1", harga: 10000, deskripsi: "Deskripsi produk 1", kategori_produk: "Makanan", image_produk: "https://via.placeholder.com/150", update_at: "2022-10-10"}]);
            }
            console.log(products);
            const filtered = jenisLowerCase
                ? products.filter((item) => item.kategori_produk.toLowerCase() === jenisLowerCase)
                : products;

            setFilteredProducts(filtered);

        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            console.log(filteredProducts);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        
        fetchFilteredProducts() 
    }, [isLoadingProduct]);


    const navigateTo = useNavigate();

    function addCart(product, id) {
        addToCart(product, id);

    }




    console.log(products);
    return <>
        {isLoading ? (<Typography className="text-center text-[20px] text-black mt-8">Loading...</Typography>) :
            <div className="mt-8 flex flex-wrap gap-8 justify-center">
                {filteredProducts.map((item, index) => (
                    <Card key={index} className=" w-[270px] p-0">
                        <img
                            src={item.image_produk}
                            alt="card-image"
                            className="rounded-lg h-[200px]"
                        />

                        <CardBody  >
                            <Typography variant="h2" color="blue-gray" className="mb-2 h-[20px] overflow-y-auto  text-[17px]">
                                {item.nama_produk}
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2  flex gap-1">
                                <p className="font-semibold text-[14px] mt-[2px] "> {item.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </p>
                            </Typography>
                            <Typography className="text-[14px] h-[100px] overflow-hidden">
                                {item.deskripsi}
                            </Typography>
                            <Typography className="text-[11px] mt-3 text-gray-400 ">
                                Diperbaharui {products.update_at}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex justifiy-around gap-[90px]">
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
            </div>}

    </>
}