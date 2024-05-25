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
import { NavLink } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { bahanBakuTableData } from "@/data";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/global_context";
import { GetAllBahanBaku } from "@/api/bahanBakuApi";
import { UpdateBahanBaku, DeleteBahanBaku } from "../button";

export function BahanBakuTable() {
  const [data, setData] = useState([]);
  const { search } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    GetAllBahanBaku()
      .then((response) => {
        console.log(response)
        setData(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  console.log(search);

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
    <div className="mb-8 flex flex-col gap-12">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["No", "Nama Bahan", "Stok", "Satuan", "Aksi"].map((el) => (
              <th
                key={el}
                className="border-b border-blue-gray-50 py-3 px-5 text-left border-r"
              >
                <Typography
                  variant="small"
                  className=" text-center text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows
            .filter((item) => {
              const lowerCaseSearch = search.toLowerCase();
              return (
                lowerCaseSearch === "" ||
                item.nama_bahan.toLowerCase().includes(lowerCaseSearch) ||
                item.stok_bahan.toString().toLowerCase().includes(lowerCaseSearch) ||
                item.satuan.toLowerCase().includes(lowerCaseSearch)
              );
            }).map(
              ({ id_bahan, nama_bahan, stok_bahan, satuan }, index) => {
                const className = `py-3 px-5 text-center border-r ${index === bahanBakuTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                  }`;
                const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                return (
                  <tr key={index}>
                    <td className={className}>
                      <div className="text-xs font-semibold text-blue-gray-600">
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
                        {nama_bahan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {stok_bahan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {satuan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex justify-center ">
                        <UpdateBahanBaku id={id_bahan} />
                        <DeleteBahanBaku id={id_bahan} />
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
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
