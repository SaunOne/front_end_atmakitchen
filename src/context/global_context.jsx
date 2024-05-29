import React, { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [selectedTabValue, setSelectedTabValue] = useState("Utama");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState({ bool: false, message: "" });
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({})
    const [selectedTabPesanan, setSelectedTabPesanan] = useState("Pre-Order");
    const [data, setData] = useState({});
    const [isReady, setIsReady] = useState(true);
    const [selectedTabStatus, setSelectedTabStatus] = useState("menunggu biaya pengiriman");

    return (
        <GlobalContext.Provider
            value={{
                selectedTabValue, setSelectedTabValue,
                search, setSearch,
                error, setError,
                success, setSuccess,
                user, setUser,
                isLogin, setIsLogin,
                selectedTabPesanan, setSelectedTabPesanan,
                data, setData,
                isReady, setIsReady,
                selectedTabStatus, setSelectedTabStatus,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };