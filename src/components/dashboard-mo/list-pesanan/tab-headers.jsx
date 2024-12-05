import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/global_context';


export function TabHeader() {
    const { selectedTabMO, setSelectedTabMO } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    // useEffect(() => {
    //     setSelectedTabValue("Utama");
    // }, []);

    const tabsProduct = [
        { label: "Menunggu Konfirmasi", value: "pembayaran valid", name: "Menunggu Konfirmasi" },
        { label: "Menunggu Di Proses", value: "diterima", name: "Menunggu Di Proses" },
    ];

    const handleTabChange = (value) => {
        setSelectedTabMO(value);
    };

    return (
        <div className="grid grid-cols-2 text-lg">
            <Tabs value={selectedTabMO} onChange={handleTabChange}  >
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabMO(tab.value)}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}