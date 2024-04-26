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
  import { productTableData, resepTableData } from "@/data";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  
  export function BahanBaku() {

    const navigate = useNavigate();

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="flex justify-end">
          <Button onClick={() => navigate('/admin/bahanBaku/addBahanBaku')}>Tambah</Button>
        </div>
        <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel Bahan Baku
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama Resep", "Bahan", "Jumlah Kebutuhan", "Stok", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resepTableData.map(
                ({ img, name, ingridients, amount, stok }, key) => {
                  const className = `py-3 px-5 ${
                    key === resepTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {ingridients}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {stok}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href=""
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default BahanBaku;
  