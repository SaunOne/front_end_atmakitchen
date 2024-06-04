import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react"; 
import { GetLaporanPemakaianBahan } from "@/api/laporanApi";
import { PenggunaanBahanReport } from "./penggunaan-bahan-report";

export function PenggunaanBahanTable() {
    const tanggal = new Date().toLocaleDateString();
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(`${tanggal.substr(6, 4)}-${tanggal.substr(3, 2)}-${tanggal.substr(0, 2)}`);
    const [endDate, setEndDate] = useState(`${tanggal.substr(6, 4)}-${tanggal.substr(3, 2)}-${tanggal.substr(0, 2)}`);
    const [isLoading, setIsLoading] = useState(true);

    console.log(startDate);
    useEffect(() => {
        setIsLoading(true);
        let formattedDate = {}
        formattedDate.start_date = startDate;
        formattedDate.end_date = endDate;
        console.log(formattedDate);
        GetLaporanPemakaianBahan(formattedDate)
            .then((response) => {
                console.log(response);
                setData(response);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [startDate, endDate]);

    // Handler for changing the selected year
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // Handler for changing the selected month
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <>
            <div className="mb-4 p-4 flex justify-start gap-4">
                {/* Dropdown for selecting the year */}
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">Start Date:</label>
                <Input type="date" name="startDate" className="px-4 w-[200px] py-2 border rounded-md" value={startDate} onChange={handleStartDateChange}  />    

                {/* Dropdown for selecting the month */}
                <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-700">End Date:</label>
                <Input type="date" name="endDate" className="px-4 w-[200px] py-2 border rounded-md" value={endDate} onChange={handleEndDateChange}  />    
            </div>

            {/* Display loading message or data */}
            {isLoading ? (
                <div className="flex justify-center items-center h-52">Loading...</div>
            ) : (
                <div className="p-2 rounded-lg">
                    <PenggunaanBahanReport data={data} />
                </div>
            )}
        </>
    );
}
