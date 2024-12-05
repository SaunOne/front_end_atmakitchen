import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/global_context';


export default function TabHeaders() {
    const { selectedTabValue, setSelectedTabValue } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    // useEffect(() => {
    //     setSelectedTabValue("Utama");
    // }, []);

    const tabsProduct = [
        { label: "Utama", value: "Utama", name: "Utama" },
        { label: "Titipan", value: "Titipan", name: "Titipan" },
        { label: "Hampers", value: "Hampers", name: "Hampers" }
    ];

    const handleTabChange = (value) => {
        setSelectedTabValue(value);
    };



    return (
        <div className="grid grid-cols-2 text-lg">
            <Tabs value={selectedTabValue} onChange={handleTabChange}  >
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabValue(tab.value)}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
            <div className="flex justify-end">
                <Button onClick={() => navigateTo('/admin/product/add')}>Tambah</Button>
            </div>
        </div>
    );
}