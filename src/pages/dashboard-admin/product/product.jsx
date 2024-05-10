import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  CardFooter,
  IconButton
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context/context";
import TabHeaders from "@/components/dashboard-admin/product/tab-headers";
import ProductTable from "@/components/dashboard-admin/product/table";
import Search from "@/components/dashboard-admin/search";
import { ToastContainer, toast } from 'react-toastify';

export function ProductAdmin() {
  const { selectedTabValue } = useContext(GlobalContext);
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
        <TabHeaders />
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel Produk {selectedTabValue}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <ProductTable />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ProductAdmin;
