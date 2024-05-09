
import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
//import StaffTable from "@/components/dashboard-mo/staff/tables";
import { useNavigate } from "react-router-dom";
import Search from "@/components/dashboard-mo/search";
import PengeluaranBahanTable from "@/components/dashboard-mo/pengeluaran-bahan-baku/table";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/context";
import { ToastContainer, toast } from 'react-toastify';

export default function PengeluaranBahanBakuMO() {
    const navigate = useNavigate();
    const { success, setSuccess } = useContext(GlobalContext);

    useEffect(() => {
        console.log(success);
        if (success.bool) {
            toast.success(success.message);

            setTimeout(() => {
                setSuccess({ bool: false, message: '' });
            }, 1000);
        }
    }, [success]);

    return (
        <div className="mt-6 mb-8 flex flex-col gap-10">
            <div className="text-lg">
                <div className="flex justify-beetwen gap-6 md:gap-[40%]">
                    <Search className="w-full" placeholder="Cari pengeluaran bahan baku..." />
                    <Button onClick={() => navigate("/mo/pengeluaran-bahan-baku/add")}>Tambah</Button>
                </div>
            </div>
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Tabel Pengeluaran Bahan Baku
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <PengeluaranBahanTable/>
                </CardBody>
            </Card>
            <ToastContainer />
        </div>
    );
}
