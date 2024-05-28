import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/context';


export default function TabHeaders2() {
    const { selectedTabValue2, setSelectedTabValue2 } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    // useEffect(() => {
    //     setSelectedTabValue("Utama");
    // }, []);

    const tabsJarak = [
        { label: "Input Jarak", value: "Input Jarak", name: "Input Jarak" },
        { label: "Konfirmasi Pesanan", value: "Konfirmasi Pesanan", name: "Konfirmasi Pesanan" }
    ];

    const handleTabChange = (value) => {
        setSelectedTabValue2(value);
    };



    return (
        <div className="grid grid-cols-2 text-lg">
            <Tabs value={selectedTabValue2} onChange={handleTabChange}  >
                <TabsHeader>
                    {tabsJarak.map(tab => (
                        <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabValue2(tab.value)}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
            {/* <div className="flex justify-end">
                <Button onClick={() => navigateTo('/admin/product/add')}>Tambah</Button>
            </div> */}
        </div>
    );
}