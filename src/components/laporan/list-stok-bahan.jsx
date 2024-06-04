import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GetLaporanStokBahan } from "@/api/laporanApi";
import Chart from "react-apexcharts";
import { StokBahanReport } from "./stok-bahan-report";


export function StokBahanTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        GetLaporanStokBahan()
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
    }, []);


    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-52">Loading...</div>
            ) : (
                <div className="p-2 rounded-lg">
                    <StokBahanReport data={data} />
                </div>
            )}
        </>
    );

}
