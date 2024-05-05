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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ListPesanan() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const closeAlertWithTimeout = (setOpenFunc) => {
    setTimeout(() => {
      setOpenFunc(false);
    }, 2500); // 1000 milidetik = 1 detik
  };

  useEffect(() => {
    if (open) {
      closeAlertWithTimeout(setOpen);
    }
    if (open2) {
      closeAlertWithTimeout(setOpen2);
    }
  }, [open, open2]);

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
              {listPesananData.map(({ no, name, order, amount }, key) => {
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
                      <button
                        className=" me-2 bg-green-500 text-center p-2 text-black rounded-m"
                        onClick={() => setOpen(true)}
                      >
                        Confirm
                      </button>
                      <button
                        className=" bg-red-500 text-center p-2 text-black rounded-m"
                        onClick={() => setOpen2(true)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Table List Pesanan
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No", "Nama Pemesan", "Pesanan", "Jumlah", "Status"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] text-center font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {listPesananData.map(
                ({ no, name, amount, order, status }, key) => {
                  const className = `py-3 px-5 text-center ${
                    key === listPesananData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {no}
                        </Typography>
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
                      <td className="flex justify-center my-5">
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "red"}
                          value={status ? "accept" : "reject"}
                          size="sm"
                          className="py-0.5 px-2 text-white flex justify-center"
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div>
        {open && (
          <Alert
            icon={<Icon />}
            open={open}
            onClose={() => setOpen(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            className="fixed bottom-0 left-0 mb-4 ml-4 rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
          >
            Berhasil konfirmasi pesanan
          </Alert>
        )}
        {open2 && (
          <Alert
            icon={<Icon />}
            open={open2}
            onClose={() => setOpen2(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            className="fixed bottom-0 left-0 mb-4 ml-4 rounded-none border-l-4 border-[#ff0000] bg-[#ff0000]/10 font-medium text-[#ff0000]"
          >
            Berhasil batalkan pesanan
          </Alert>
        )}
      </div>
    </div>
  );
}

export default ListPesanan;
