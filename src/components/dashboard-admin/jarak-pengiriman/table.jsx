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
  Input
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { listPesananData } from "@/data";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/context";
import { ConfirmJarak } from "@/components/dashboard-admin/button";
import { DeleteJarak } from "@/components/dashboard-admin/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function TableJarakPengiriman() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { search, selectedTabValue } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setData(listPesananData);
}, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-2 flex flex-col gap-12">
        {/* {isLoading ? (
            <div>Loading...</div>
        ) : ( */}
        <table className="w-full min-w-[640px] table-auto">
            <thead>
                <tr>
                {["No", "No Transaksi", "Nama Pemesan", "Alamat", "Aksi"].map((el) => (
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
                {currentRows.filter((item) => {
                    const lowerCaseSearch = search.toLowerCase();
                    return(
                        item.name.toLowerCase().includes(lowerCaseSearch) ||
                        item.order.some(orderItem => orderItem.toLowerCase().includes(lowerCaseSearch)) ||
                        item.amount.some(amountItem => amountItem.toLowerCase().includes(lowerCaseSearch))
                    );
                }).map(({ id, name, order, amount, total_harga }, index) => {
                const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                const className = `py-3 px-5 text-center ${
                    index === listPesananData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                    <tr key={index}>
                        <td className={className}>
                            <div className="gap-4">
                            <div>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                                >
                                {rowNumber}
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
                            {order.map((item, index) => (
                                <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                                    {item}
                                </Typography>
                            ))}
                        </td>
                        <td className={className}>
                            {amount.map((item, index) => (
                                <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                                    {item}
                                </Typography>
                            ))}
                        </td>
                        <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                {total_harga}
                            </Typography>
                        </td>
                        <td className={className}>
                            <div className="flex gap-2 justify-center">
                                <button
                                    className="select-none rounded-md bg-green-100 p-2 text-center align-middle font-sans text-xs font-bold uppercase text-green-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button" onClick={handleOpenModal}>
                                    Confirm
                                </button>

                                
                                <div className={`pointer-events-none fixed inset-0 ${isModalOpen ? 'z-[999]' : 'z-[-1]'} grid h-screen w-screen place-items-center bg-black bg-opacity-20 ${isModalOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                    <div className="pointer-events-auto relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                        <button onClick={handleCloseModal} className=" absolute top-3 right-3 text-lg font-bold">
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </button>
                                        <div class="flex flex-col gap-4 p-6">
                                            <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                Jarak Pengiriman
                                            </h4>
                                            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                Alamat
                                            </h6>
                                            <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                disabled />
                                            </div>
                                            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                Jarak Pengiriman
                                            </h6>
                                            <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"/>
                                            </div>
                                            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                Ongkir
                                            </h6>
                                            <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                disabled />
                                            </div>
                                            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                                Total Harga
                                            </h6>
                                            <div class="relative h-11 w-full min-w-[200px]">
                                            <input
                                                class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                disabled />
                                            </div>
                                        </div>
                                        <div class="p-6 pt-0">
                                            <button
                                            class="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                                            type="button"
                                            // onClick={() => navigate('/admin/jarakPengiriman')}
                                            onClick={handleCloseModal}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>  
                                <DeleteJarak/>
                            </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        {/* )} */}
        <div className="flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
  );
}
