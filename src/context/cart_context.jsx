import React, { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context/global_context";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    console.log(cart)
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        
        if (savedCart) {
            setCart(JSON.parse(savedCart));
            console.log("Saved cart from local storage:", savedCart);
        }
    }, []);

    // Save cart data to local storage whenever cart state changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.harga * currentItem.amount
        }, 0)
        setTotal(total)

    }, [cart])


    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount
            }, 0)
            setItemAmount(amount)
        }
    }, [cart])

    const addToCart = (product, id_produk) => {
        // console.log(product)
        // console.log(`Item ${product.title } Added to the Cart`)
        if (product.jenis_produk === "Titipan" && product.jumlah_stok < product.amount + 1) {

        } else {
            const newItem = { ...product, amount: 1 };

            const cartItem = cart.find((item) => {
                return item.id_produk === id_produk;
            });

            if (cartItem) {
                const newCart = [...cart].map((item) => {
                    if (item.id_produk === id_produk) {
                        return { ...item, amount: cartItem.amount + 1 };
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

    const addToCartWithAmount = (product, id_produk, amount) => {
        // console.log(product)
        // console.log(`Item ${product.title } Added to the Cart`)
        const newItem = { ...product, amount: amount };

        const cartItem = cart.find((item) => {
            return item.id_produk === id_produk;
        });

        if (cartItem) {
            const newCart = [...cart].map((item) => {
                if (item.id_produk === id_produk) {
                    return { ...item, amount: cartItem.amount + amount };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
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
                    return { ...item, amount: cartItem.amount - 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        }

        if (cartItem.amount < 2) {
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

            }}
        >
            {" "}
            {children}{" "}
        </CartContext.Provider>
    );
};

export default CartProvider;
