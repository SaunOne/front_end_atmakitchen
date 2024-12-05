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
import { GetAllWithdrawUser, KonfirmasiWithdraw } from "@/api/customersApi";
import { WithdrawModal } from "@/components/layouts/withdraw-modal";

export function WithdrawTable() {
  const [data, setData] = useState([]);
  const { search } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [idWithdraw, setIdWithdraw] = useState(null);

  const handleOpenModal = (id_withdraw) => {
    setModalOpen(true);
    setIdWithdraw(id_withdraw);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTolak = () => {
    const updatedData = { id: idWithdraw, status: "ditolak" };
    console.log(updatedData);
    KonfirmasiWithdraw(updatedData)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            handleCloseModal();
            window.location.reload();
        });
};

const handleTerima = () => {
    const updatedData = { id: idWithdraw, status: "diterima" };
    KonfirmasiWithdraw(updatedData)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            handleCloseModal();
            window.location.reload();
        });
};

  useEffect(() => {
    GetAllWithdrawUser()
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const filteredRows = data.filter((item) => {
    const lowerCaseSearch = search.toLowerCase();

    const idUserExists = item.id_user && item.id_user.toString().toLowerCase().includes(lowerCaseSearch);
    const jumlahExists = item.jumlah && item.jumlah.toString().toLowerCase().includes(lowerCaseSearch);
    const statusExists = item.status && item.status.toLowerCase().includes(lowerCaseSearch);
    const tanggalExists = item.tanggal && item.tanggal.toLowerCase().includes(lowerCaseSearch);
    const namaBankExists = item.nama_bank && item.nama_bank.toLowerCase().includes(lowerCaseSearch);
    const noRekeningExists = item.no_rek && item.no_rek.toString().toLowerCase().includes(lowerCaseSearch);
    const statusFilter = item.status === "menunggu konfirmasi";

    return (idUserExists || jumlahExists || statusExists || tanggalExists || namaBankExists || noRekeningExists) && statusFilter;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-8 flex flex-col gap-12">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["No", "ID User", "Jumlah Withdraw", "Status", "Tanggal", "Nama Bank", "No Rekening", "Aksi"].map((el) => (
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
          {currentRows.map((item, index) => {
            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
            const className = `py-3 px-5 text-center ${index === data.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;
            
              return(
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
                        {item.id_user}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.jumlah}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.status}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.tanggal}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.nama_bank}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.no_rek}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex justify-center ">
                        <button type="button" onClick={() => handleOpenModal(item.id_withdraw)} className="rounded-md bg-green-100 p-2 text-center align-middle font-sans text-xs font-bold uppercase text-green-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                          Konfirmasi
                        </button>
                      </div>
                    </td>
                  </tr>
              );
            })}
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
      <WithdrawModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        id={idWithdraw}
        handleTolak={handleTolak}
        handleTerima={handleTerima}
      />
    </div>
  );
}
