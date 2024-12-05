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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableCustomer from "@/components/dashboard-admin/customer/table";
import Search from "@/components/dashboard-admin/search";
import { TableHistory } from "@/components/dashboard-admin/customer/tableHistory";

export function HistoryPesananCustomer() {
  const navigate = useNavigate();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex gap-6 md:gap-[40%]">
        <Search className="w-full" placeholder="Cari history pesanan ..." />
      </div>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel History Pesanan
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <TableHistory/>
        </CardBody>
      </Card>
      
    </div>
  );
}
