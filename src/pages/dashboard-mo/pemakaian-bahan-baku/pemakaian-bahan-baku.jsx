import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import {PemakaianBahanTable} from "@/components/dashboard-mo/pemakaian-bahan/pemakaian-bahan";
import { useNavigate } from "react-router-dom";
import Search from "@/components/dashboard-mo/search";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/global_context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function PemakaianBahanMO() {

    return (
        <div className="mt-6 mb-8 flex flex-col gap-10">
            <div className="text-lg">
                <div className="flex justify-beetwen gap-6 md:gap-[40%]">
                    <Search className="w-full" placeholder="Cari pengeluaran lain-lain..." />
                </div>
            </div>
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Tabel Pemakaian Bahan Baku
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <PemakaianBahanTable />
                </CardBody>
            </Card>
        </div>
    );
}