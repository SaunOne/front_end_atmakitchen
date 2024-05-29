import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/global_context';


export default function TabPesanan() {
    const { selectedTabStatus, setSelectedTabStatus } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    // useEffect(() => {
    //     setSelectedTabValue("Utama");
    // }, []);

    const tabsProduct = [
        { label: "Input Jarak", value: "menunggu biaya pengiriman", name: "Input Jarak" },
        { label: "Validasi Pembayaran", value: "sudah dibayar", name: "Validasi Pembayaran" },
    ];

    const handleTabChange = (value) => {
        setSelectedTabStatus(value);
    };

    return (
        <div className="grid grid-cols-2 text-lg">
            <Tabs value={selectedTabStatus} onChange={handleTabChange} >
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabStatus(tab.value)}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}