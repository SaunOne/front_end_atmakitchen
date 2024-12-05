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
  import { NavLink } from 'react-router-dom';
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { resepTableData } from "@/data";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { ResepTable } from "@/components/dashboard-admin/resep/table";
  import Search from "@/components/dashboard-admin/search";
  
  export function Resep() {

    const navigate = useNavigate();

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="flex justify-between gap-6 md:gap-[40%]">
          <Search className="w-full" placeholder="Cari resep ..."/>
          <Button onClick={() => navigate('/admin/resep/addResep')}>Tambah</Button>
        </div>
        <Card>
        <CardHeader variant="gradient" color="gray" className="p-6">
            <Typography variant="h6" color="white">
              Tabel Resep 
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <ResepTable/>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default Resep;
  