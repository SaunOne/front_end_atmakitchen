import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/global_context';

export default function TabHeaders() {
    const {isReady} = useContext(GlobalContext);
    const { selectedTabPesanan, setSelectedTabPesanan } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const tabsProduct = [
        { label: "Pre-Order", value: "Pre-Order", name: "Pre-Order" },
        { label: "Ready Stock", value: "Ready Stock", name: "Ready Stock" },
    ];

    const handleTabChange = (value) => {
        setSelectedTabPesanan(value);
    };

    useEffect(() => {
        if (!isReady && selectedTabPesanan === "Ready Stock") {
            setSelectedTabPesanan("Pre-Order");
        }
    }, [isReady, selectedTabPesanan, setSelectedTabPesanan]);

    return (
        <div className="grid grid-cols-2 mt-4 text-lg">
            <Tabs value={selectedTabPesanan} onChange={handleTabChange}>
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab
                            className="w-[150px]"
                            key={tab.value}
                            value={tab.value}
                            onClick={() => setSelectedTabPesanan(tab.value)}
                            disabled={!isReady && tab.value === "Ready Stock"} // Menonaktifkan tab "Ready Stock" jika ready bernilai false
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}

export function TabHeaderProduk({ openReady }) {
    const { selectedTabPesanan, setSelectedTabPesanan } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const tabsProduct = [
        { label: "Pre-Order", value: "Pre-Order", name: "Pre-Order" },
        { label: "Ready Stock", value: "Ready Stock", name: "Ready Stock" },
    ];

    const handleTabChange = (value) => {
        setSelectedTabPesanan(value);
    };

    useEffect(() => {
        if (!openReady && selectedTabPesanan === "Ready Stock") {
            setSelectedTabPesanan("Pre-Order");
        }
    }, [openReady, selectedTabPesanan, setSelectedTabPesanan]);

    return (
        <div className="mt-4 text-md">
            <Tabs value={selectedTabPesanan} onChange={handleTabChange}>
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab
                            className="w-[120px] h-9"
                            key={tab.value}
                            value={tab.value}
                            onClick={() => setSelectedTabPesanan(tab.value)}
                            disabled={!openReady && tab.value === "Ready Stock"} // Menonaktifkan tab "Ready Stock" jika openReady bernilai false
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}