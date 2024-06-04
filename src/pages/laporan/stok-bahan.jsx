import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import {StokBahanTable} from "@/components/laporan/list-stok-bahan";


export function LaporanStokBahan() {
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Laporan Stok Bahan Baku
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <StokBahanTable/>
                </CardBody>
            </Card>
        </div>
    );
}

export default LaporanStokBahan;
