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
  import { listPesananData } from "@/data";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  
  export function ListPesanan() {

    const navigate = useNavigate();

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel List Pesanan
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No", "Nama Pemesan", "Pesanan", "Jumlah", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] text-center font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listPesananData.map(
                ({ no, name, order, amount }, key) => {
                  const className = `py-3 px-5 text-center ${
                    key === listPesananData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {no}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order[0]}
                        </Typography>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {amount[0]}
                        </Typography>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {amount[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <button className=" me-2 bg-green-500 text-center p-1 text-black rounded-m">
                            Confirm
                        </button>
                        <button className=" bg-red-500 text-center p-1 text-black rounded-m">
                            Delete
                        </button>
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
  
  export default ListPesanan;
  