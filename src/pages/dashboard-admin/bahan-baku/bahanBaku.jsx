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
} from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BahanBakuTable } from "@/components/dashboard-admin/bahanBaku/table";
import Search from "@/components/dashboard-admin/search";
import { GlobalContext } from "@/context/global_context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function BahanBaku() {

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
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex justify-beetwen gap-6 md:gap-[40%]">
        <Search className="w-full" placeholder="Cari bahan baku ..." />
        <Button onClick={() => navigate('/admin/bahanBaku/addBahanBaku')}>Tambah</Button>
      </div>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel Bahan Baku
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <BahanBakuTable />
        </CardBody>
      </Card>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default BahanBaku;
