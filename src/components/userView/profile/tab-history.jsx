import React from 'react';
import { Tabs, Tab, TabsHeader, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '@/context/global_context';


export default function TabHistory() {
    const { selectedTabHistory, setSelectedTabHistory } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const tabsProduct = [
        { label: "Withdraw Form", value: "withdraw form", name: "Withdraw Form" },
        { label: "History Withdraw", value: "history withdraw", name: "History Withdraw" },
    ];

    const handleTabChange = (value) => {
        setSelectedTabHistory(value);
    };

    return (
        <div className="grid grid-cols-3 text-lg">
            <Tabs value={selectedTabHistory} onChange={handleTabChange} >
                <TabsHeader>
                    {tabsProduct.map(tab => (
                        <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabHistory(tab.value)}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}