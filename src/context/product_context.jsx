import React, { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { GetAllProduk, GetAllProdukByDate } from "@/api/produkApi";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [datePO, setDatePO] = useState("");
    console.log(datePO)
    const [itemPurchase, setItemPurchase] = useState([]);


    useEffect(() => {
        const now = new Date();
        const currentTime = format(now, "d MMMMMMMMMM y HH.mm 'WIB' ", { locale: id });

        const fetchProducts = async () => {
            const data = GetAllProduk()
                .then((response) => {
                    console.log(response)
                    response.update_at = currentTime;
                    setProducts(response);

                })
                .catch((err) => {
                    console.log(err);
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoadingProduct(false);
                })

            data.update_at = currentTime;

            setProducts(data);
        };


        const fetchProductsPO = async () => {
            const data = GetAllProdukByDate(datePO)
                .then((response) => {
                    console.log(response)
                    response.update_at = currentTime;
                    setProducts(response);

                })
                .catch((err) => {
                    console.log(err);
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoadingProduct(false);
                })

            data.update_at = currentTime;

            setProducts(data);
        };

        if (datePO) {
            fetchProductsPO();
        } else {
            fetchProducts();
        }

    }, [datePO]);

    console.log(products);

    return (
        <ProductContext.Provider value={{ products, setProducts, itemPurchase, setItemPurchase, datePO, setDatePO, isLoadingProduct, setIsLoadingProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
