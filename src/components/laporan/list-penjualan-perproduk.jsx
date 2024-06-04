import React, { useEffect, useState } from "react";
import { GetLaporanBulananProduk } from "@/api/laporanApi";
import { PenjualanPerProdukReport } from "./penjualan-perproduk-report";

export function PenjualanPerprodukTable() {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [isLoading, setIsLoading] = useState(true);

    // Generate years for dropdown options, including the last five years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, index) => currentYear - index);

    // Generate months for dropdown options (1 to 12) with their respective names
    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    // Function to format the date
    const formatDate = (year, month) => `${year}-${month < 10 ? '0' + month : month}`;

    useEffect(() => {
        setIsLoading(true);
        const formattedDate = formatDate(year, month);
        console.log(formattedDate);
        GetLaporanBulananProduk(formattedDate)
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
    }, [year, month]);

    // Handler for changing the selected year
    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value));
    };

    // Handler for changing the selected month
    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value));
    };

    return (
        <>
            <div className="mb-4 p-4 flex justify-start gap-4">
                {/* Dropdown for selecting the year */}
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">Select Year:</label>
                <select id="year" name="year" className="px-4 w-[200px] py-2 border rounded-md" onChange={handleYearChange}>
                    {years.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>

                {/* Dropdown for selecting the month */}
                <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-700">Select Month:</label>
                <select id="month" name="month" className="px-4 w-[200px] py-2 border rounded-md" onChange={handleMonthChange}>
                    {months.map((monthOption) => (
                        <option key={monthOption.value} value={monthOption.value}>{monthOption.label}</option>
                    ))}
                </select>
            </div>

            {/* Display loading message or data */}
            {isLoading ? (
                <div className="flex justify-center items-center h-52">Loading...</div>
            ) : (
                <div className="p-2 rounded-lg">
                    <PenjualanPerProdukReport data={data} />
                </div>
            )}
        </>
    );
}
