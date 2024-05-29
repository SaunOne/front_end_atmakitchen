import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
    Button,
    IconButton,
    Tab,
    Tabs,
    TabsHeader,
    Alert,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { TableListPesanan } from "@/components/dashboard-mo/list-pesanan/table";
import Search from "@/components/dashboard-mo/search";
import { TabHeader } from "@/components/dashboard-mo/list-pesanan/tab-headers";

export function KonfirmasiPesanan() {

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex gap-6 md:gap-[40%]">
                <Search className="" placeholder="Cari pesanan ..." />
                
            </div>
            <TabHeader />
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Tabel List Pesanan
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <TableListPesanan />
                </CardBody>
            </Card>
        </div>
    );
}

export default KonfirmasiPesanan;
