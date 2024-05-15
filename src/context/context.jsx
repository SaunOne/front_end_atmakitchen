import React, { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [selectedTabValue, setSelectedTabValue] = useState("Utama");
    const [selectedTabValue2, setSelectedTabValue2] = useState("Input Jarak");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState({ bool: false, message: "" });
    const [isLogin, setIsLogin] = useState(false);



    const userData = {
        id: 1,
        img: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        username: "kevinjr88",
        email: "julian@gmail.com",
        nama_lengkap: "Kevin Julian Rahadinata",
        no_telp: "08123456789",
        gender: "Male",
        tanggal_lahir: "1990-04-26",
        jumlah_saldo: 1000000,
        jumlah_point: 100,
        alamat: [{
            id: 1,
            detail_alamat: "Jl. Kebon Jeruk No. 1",
            kelurahan: "Kebon Jeruk",
            kecamatan: "Kebon Jeruk",
            kabupaten: "Jakarta Barat",
            provinsi: "DKI Jakarta",
            kode_pos: "11530"
        }],
        pesanan: [
            {
                id_pesanan: "12.123.123",
                tanggal_pesan: "2021-10-10",
                tanggal_ambil: "2021-10-13",
                total_harga: 1700000,
                produk: [
                    {
                        id: 1,
                        nama: "Lapis Legit 1/2 Loyang",
                        gambar: "https://kurio-img.kurioapps.com/21/03/03/fba953f2-c456-49e3-bec5-7adc1cbfd5a6.jpe",
                        harga: 850000,
                        jumlah: 2
                    },
                ]
            }
        ]
    };
    const [user, setUser] = useState(userData);



    return (
        <GlobalContext.Provider
            value={{
                selectedTabValue, setSelectedTabValue,
                selectedTabValue2, setSelectedTabValue2,
                search, setSearch,
                error, setError,
                success, setSuccess,
                user, setUser,
                isLogin, setIsLogin,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };