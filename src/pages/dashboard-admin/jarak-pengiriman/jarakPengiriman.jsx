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
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { listPesananData } from "@/data";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TableListPesanan } from "@/components/dashboard-admin/list-pesanan/table";
import Search from "@/components/dashboard-admin/search";
import { TableJarakPengiriman } from "@/components/dashboard-admin/jarak-pengiriman/table";
import { GlobalContext } from "@/context/context";
import TabHeaders2 from "@/components/dashboard-admin/jarak-pengiriman/tab-headers";

export function JarakPengiriman() {
  const navigate = useNavigate();
  const { selectedTabValue2 } = useContext(GlobalContext);
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
    <div className="mt-8">
      <Search  />
      <div className="mt-6 mb-8 flex flex-col gap-10">
        <TabHeaders2 />
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel {selectedTabValue2}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <TableJarakPengiriman />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default JarakPengiriman;
