import React, { use } from "react";
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
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { listPesananData } from "@/data";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TableListPesanan } from "@/components/dashboard-admin/list-pesanan/table";
import { GlobalContext } from "@/context/global_context";
import Search from "@/components/dashboard-admin/search";
import TabPesanan from "@/components/dashboard-admin/list-pesanan/tab-pesanan";
import { ToastContainer, toast } from 'react-toastify';

export function ListPesanan() {
  const navigate = useNavigate();
  const { selectedTabStatus } = useContext(GlobalContext);

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
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex gap-6 md:gap-[10%]">
        <Search className="" placeholder="Cari list pesanan ..." />
      </div>
      <TabPesanan/>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel List Pesanan
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <TableListPesanan/>
        </CardBody>
      </Card>
    </div>
  );
}

export default ListPesanan;
