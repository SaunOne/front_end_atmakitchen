import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(null); 

    return (
        <GlobalContext.Provider value={{ search, setSearch, error, setError, success, setSuccess }}>
            {children}
        </GlobalContext.Provider>
    );
};  

export { GlobalContextProvider, GlobalContext };