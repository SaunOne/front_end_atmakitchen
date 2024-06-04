import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GetLaporanPenjualanBulanan } from "@/api/laporanApi";
import Chart from "react-apexcharts";
import { PenjualanBulananReport } from "./penjualan-bulanan-report";

export function PenjualanBulananTable() {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true);

    // Generate years for dropdown options, including the last five years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, index) => currentYear - index);

    useEffect(() => {
        setIsLoading(true);
        GetLaporanPenjualanBulanan(year)
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
    }, [year]);

    const chartData = {
        series: [{
            name: 'Jumlah Uang',
            data: data.data ? data.data.map(item => item.jumlah_uang) : []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: data.data ? data.data.map(item => item.bulan) : [],
            },
            yaxis: {
                title: {
                    text: 'Jumlah Uang (IDR)'
                },
                labels: {
                    formatter: function (value) {
                        return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                    }
                }
            }
        },
    };

    // Handler for changing the selected year
    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value));
    };

    return (
        <>
            <div className="mb-4 p-4">
                <label htmlFor="year" className="block  mb-2 text-sm font-medium text-gray-700">Select Year:</label>
                <select id="year" name="year" className="px-4 w-[200px] py-2 border rounded-md" onChange={handleYearChange}>
                    {years.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-52">Loading...</div>
            ) : (
                <div className="p-2 rounded-lg">
                    {/* Dropdown for selecting the year */}
                    <div className="mb-8">
                        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
                    </div>
                    <PenjualanBulananReport data={data} />
                </div>
            )}
        </>
    );

}
