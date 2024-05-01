import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import PengeluaranLainTable from "@/components/dashboard-mo/pengeluaran-lainnya/table";
import { useNavigate } from "react-router-dom";
import Search from "@/components/dashboard-mo/search";

export default function PengeluaranLainnyaMO() {
    const navigate = useNavigate();

    return (
        <div className="mt-6 mb-8 flex flex-col gap-10">
            <div className="text-lg">
                <div className="flex justify-beetwen gap-6 md:gap-[40%]">
                    <Search className="w-full" placeholder="Cari pengeluaran lain-lain..." />
                    <Button onClick={() => navigate("/mo/pengeluaran-lain-lain/add")}>Tambah</Button>
                </div>
            </div>
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Tabel Pengeluaran Lain-lain
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <PengeluaranLainTable/>
                </CardBody>
            </Card>
        </div>
    );
}