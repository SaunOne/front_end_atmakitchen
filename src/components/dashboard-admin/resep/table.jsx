import React, { use } from "react";
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
import { resepTableData } from "@/data";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/context";

export function ResepTable() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { search } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setData(resepTableData);
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
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["No", "Nama Resep", "Bahan", "Jumlah Kebutuhan", "Stok", ""].map(
              (el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-center"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows
            .filter((item) => {
                const lowerCaseSearch = search.toLowerCase();
                return(
                    lowerCaseSearch === "" ||
                    item.nama_resep.toLowerCase().includes(lowerCaseSearch) ||
                    item.bahan.some(b => b.toLowerCase().includes(lowerCaseSearch)) ||
                    item.jumlah.some(j => j.toLowerCase().includes(lowerCaseSearch)) ||
                    item.stok.some(s => s.toLowerCase().includes(lowerCaseSearch))
                );
            }).map(
            ({ id_resep, nama_resep, bahan, jumlah_kebutuhan, stok }, index) => {
              const className = `text-center py-3 px-5 ${
                index === resepTableData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={index}>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {id_resep}
                    </Typography>
                  </td>
                  <td className={className}>
                    <div className="gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {nama_resep}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    {bahan.map((item, index) => (
                      <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                        {item}
                      </Typography>
                    ))}
                  </td>
                  <td className={className}>
                    {jumlah_kebutuhan.map((item, index) => (
                      <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                        {item}
                      </Typography>
                    ))}
                  </td>
                  <td className={className}>
                    {stok.map((item, index) => (
                      <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                        {item}
                      </Typography>
                    ))}
                  </td>
                  <td className={className}>
                    <Typography
                      as="a"
                      href=""
                      className="text-xs font-semibold text-blue-gray-600"
                      onClick={() => navigate("/admin/resep/editResep")}
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
