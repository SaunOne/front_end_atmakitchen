import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { PengeluaranPemasukanTable } from "@/components/laporan/list-pengeluaran-pemasukan";




export function LaporanPengeluaranPemasukan() {
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Laporan Pemasukan dan Pengeluaran
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <PengeluaranPemasukanTable/>
                </CardBody>
            </Card>
        </div>
    );
}

export default LaporanPengeluaranPemasukan;
