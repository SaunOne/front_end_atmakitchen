import React, { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context/global_context";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const { selectedTabPesanan } = useContext(GlobalContext);


    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.harga * currentItem.jumlah_produk;
        }, 0);
        setTotal(total);
    }, [cart]);

    useEffect(() => {
        if (cart) {
            const jumlah_produk = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.jumlah_produk;
            }, 0);
            setItemAmount(jumlah_produk);
        }
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);



    const addToCart = (product, id_produk) => {
        if (product.jenis_produk === "Titipan" && product.jumlah_stok < product.jumlah_produk + 1) {
            toast.error("Jumlah melebihi stok yang tersedia!");
        } else {
            const newItem = { ...product, jumlah_produk: 1 };

            const cartItem = cart.find((item) => {
                return item.id_produk === id_produk;
            });

            if (cartItem) {
                const newCart = [...cart].map((item) => {
                    if (item.id_produk === id_produk) {
                        return { ...item, jumlah_produk: cartItem.jumlah_produk + 1 };
                    } else {
                        return item;
                    }
                });
                setCart(newCart);
            } else {
                setCart([...cart, newItem]);
            }

        }
    };

    const addToCartWithAmount = (product, id_produk, jumlah_produk) => {

        if (product.jenis_produk === "Titipan" && product.jumlah_stok < product.jumlah_produk + jumlah_produk) {
            toast.error("Jumlah melebihi stok yang tersedia!");
        } else if (selectedTabPesanan === "Pre-Order" && product.jumlah_sisa < product.jumlah_produk + jumlah_produk) {
            toast.error("Jumlah melebihi kuota harian yang tersedia!");
        } else {
            const newItem = { ...product, jumlah_produk: jumlah_produk };

            const cartItem = cart.find((item) => {
                return item.id_produk === id_produk;
            });
         
            if (cartItem) {
                const newCart = [...cart].map((item) => {
                    if (item.id_produk === id_produk) {
                        return { ...item, jumlah_produk: cartItem.jumlah_produk + jumlah_produk };
                        
                    } else {
                        return item;
                      
                    }
                });
                setCart(newCart);
            } else {
                setCart([...cart, newItem]);
            }
        }

    };

    const removeFromCart = (id_produk) => {
        const newCart = cart.filter((item) => {
            return item.id_produk !== id_produk;
        });

        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const increaseAmount = (id_produk) => {
        const cartItem = cart.find((item) => item.id_produk === id_produk);
        addToCart(cartItem, id_produk);
    };

    const decreaseAmount = (id_produk) => {
        const cartItem = cart.find((item) => {
            return item.id_produk === id_produk;
        });
        if (cartItem) {
            const newCart = cart.map((item) => {
                if (item.id_produk === id_produk) {
                    return { ...item, jumlah_produk: cartItem.jumlah_produk - 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        }

        if (cartItem.jumlah_produk < 2) {
            removeFromCart(id_produk);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseAmount,
                removeFromCart,
                increaseAmount,
                clearCart,
                itemAmount,
                total,
                addToCartWithAmount,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;