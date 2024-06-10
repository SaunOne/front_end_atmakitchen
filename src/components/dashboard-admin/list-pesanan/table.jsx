import React, { useState, useEffect, useContext } from "react";
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
  Input,
} from "@material-tailwind/react";
import { listPesananData } from "@/data";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/global_context";
import { BatalTransaksi, GetAllTransaction, GetAllTransaksiTelatBayar } from "@/api/transaksiApi";
import { PesananModal } from "@/components/layouts/pesanan-modal";
import ModalInputJarak from "@/components/layouts/jarak-modal";
import { ValidasiRadius, ValidasiPembayaran } from "@/validations/validation";
import { KonfirmasiAdmin } from "@/api/transaksiApi";
import { toast } from "react-toastify";
import StatusModal from "@/components/layouts/status-modal";

export function TableListPesanan() {
  const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const { search, selectedTabStatus } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isJarakModalOpen, setIsJarakModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { setSuccess, success } = useContext(GlobalContext);
  const [actionType, setActionType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusTransaksi, setStatusTransaksi] = useState("");

  console.log(selectedTabStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

    let status;

    if (actionType === "inputJarak") {
      status = "input biaya pengiriman";
    } else {
      status = selectedStatus;
      console.log(selectedStatus);
    }

    const dataToSend = {
      ...formDataObject,
      id_transaksi: selectedItemId,
      status: status,
    };

    console.log(formDataObject);
    let validationSchema;
    if (actionType === "inputJarak") {
      validationSchema = ValidasiRadius;
    } else {
      validationSchema = ValidasiPembayaran;
    }
    const parsedData = validationSchema.safeParse(dataToSend);
    if (!parsedData.success) {
      const error = parsedData.error;
      let newErrors = {};
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        };
      }
      console.log(newErrors);
      console.log(parsedData);
      return setFormErrors(newErrors);
    } else {
      console.log(parsedData.data);
      console.log(dataToSend);
      KonfirmasiAdmin(dataToSend)
        .then((response) => {
          console.log(response.message);
          if (response.message === "Pembayaran Masih Kurang" || response.message === "Transaksi Di Update Pembayaran Tidak Valid" ) {
            toast.error(response.message)
          } else{
            toast.success(response.message);
          }

          console.log(success);

          setIsJarakModalOpen(false);
          setModalOpen(false);
          navigateTo("/admin/listPesanan");
          setTimeout(() => {
            window.location.reload();    
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
        });
        
    }
    setFormErrors({});
    console.log(formErrors);
  };

  const handleUpdateStatus = () => {
    console.log(statusTransaksi);
    console.log(selectedItemId);
    if(statusTransaksi == "siap dipick-up"){
      const updatedData = { id_transaksi: selectedItemId, status: "sudah di-pickup" };
      console.log(updatedData);
      KonfirmasiAdmin(updatedData)
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
    }else{
      const updatedData = { id_transaksi: selectedItemId, status: "diambil" };
      console.log(updatedData);
      KonfirmasiAdmin(updatedData)
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
    }
  };

  useEffect(() => {
    GetAllTransaction()
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
    console.log(selectedStatus);
  };

  const handleOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
    setSelectedItemId(item.id_transaksi);
    console.log(item.id_transaksi);
  };

  const handleOpenStatusModal = (item) => {
    setStatusModalOpen(true);
    setSelectedItemId(item.id_transaksi);
    setStatusTransaksi(item.status_transaksi);
  };

  const handleOpenJarakModal = (item, type) => {
    setSelectedItemId(item.id_transaksi);
    setIsJarakModalOpen(true);
    setStatusModalOpen(false);
    setModalData(item);
    setActionType(type);
    console.log(type);
    console.log(item.id_transaksi);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsJarakModalOpen(false);
    setStatusModalOpen(false);
    setModalData({});
  };

  const filteredRows = data.filter((item) => {
    const lowerCaseSearch = search.toLowerCase();

    const nameExists = item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(lowerCaseSearch);
    const statusExists = item.status_transaksi && item.status_transaksi.toLowerCase().includes(lowerCaseSearch);

    const detailExists = item.detail_transaksi && item.detail_transaksi.some(detail =>
      detail.produk.nama_produk.toLowerCase().includes(lowerCaseSearch) ||
      detail.jumlah_produk.toString().toLowerCase().includes(lowerCaseSearch)
    );

    const totalHargaExists = item.total_harga_transaksi && item.total_harga_transaksi.toString().toLowerCase().includes(lowerCaseSearch);
    const statusTab = selectedTabStatus === "all" || item.status_transaksi === selectedTabStatus;
    // const statusExists = item.status_transaksi === "menunggu biaya pengiriman" && item.status_transaksi === "menunggu validasi pembayaran";
    return (nameExists || detailExists || totalHargaExists || statusExists) && statusTab;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="mb-2 flex flex-col gap-12">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["No", "No Transaksi", "Nama Pemesan", "Pesanan", "Jumlah", "Total Harga", "Jenis Pengiriman", "Status", "Aksi"].map((el) => (
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
          {currentRows.map((item, index) => {
            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
            const className = `py-3 px-5 text-center ${index === listPesananData.length - 1 ? "" : "border-b border-blue-gray-50"
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
                    {item.no_transaksi}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item.nama_lengkap}
                  </Typography>
                </td>
                <td className={className}>
                  {item.detail_transaksi.map((detail, index) => (
                    <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                      {detail.produk.nama_produk}
                    </Typography>
                  ))}
                </td>
                <td className={className}>
                  {item.detail_transaksi.map((detail, index) => (
                    <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                      {detail.jumlah_produk}
                    </Typography>
                  ))}
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item.total_harga_transaksi}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item.jenis_pengiriman}
                  </Typography>
                </td>
                <td className={className}>
                  {item.status_transaksi === "sudah dibayar" && (
                    <Chip className=" text-xs" variant="gradient" value={item.status_transaksi} color="green" size="sm" />
                  )}
                  {item.status_transaksi === "menunggu biaya pengiriman" && (
                    <Chip className=" text-[14px]" variant="gradient" value={item.status_transaksi} color="indigo" size="sm" />
                  )}
                  {item.status_transaksi === "diproses" && (
                    <Chip className=" text-xs" variant="gradient" value={item.status_transaksi} color="orange" size="sm" />
                  )}
                  {item.status_transaksi === "siap dipick-up" && (
                    <Chip className=" text-[14px]" variant="gradient" value={item.status_transaksi} color="orange" size="sm" />
                  )}
                  {item.status_transaksi === "sudah dipick-up" && (
                    <Chip className=" text-[14px]" variant="gradient" value={item.status_transaksi} color="orange" size="sm" />
                  )}
                  {item.status_transaksi === "dikirim kurir" && (
                    <Chip className=" text-xs" variant="gradient" value={item.status_transaksi} color="orange" size="sm" />
                  )}
                  {item.status_transaksi === "selesai" && (
                    <Chip className=" text-xs" variant="gradient" value={item.status_transaksi} color="green" size="sm" />
                  )}
                </td>
                <td className={className}>
                  <div className="flex gap-2 justify-center">
                    {item.status_transaksi === "menunggu validasi pembayaran" || item.status_transaksi === "sudah dibayar" && (
                      <button onClick={() => handleOpenModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Validasi</span>
                      </button>
                    )}
                    {item.status_transaksi === "menunggu biaya pengiriman" && (
                      <button
                      className="rounded-md bg-green-100 p-2 text-center align-middle font-sans text-xs font-bold uppercase text-green-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button" 
                      onClick={() => handleOpenJarakModal(item, "inputJarak")}
                    >
                      Input Jarak
                    </button>
                    )}
                    {item.status_transaksi === "diproses" && item.jenis_pengiriman === "Pick Up" && (
                      <button onClick={() => handleOpenStatusModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Update</span>
                      </button>
                    )}
                    {item.status_transaksi === "diproses" && item.jenis_pengiriman === "Atma Kitchen Delivery" && (
                      <button onClick={() => handleOpenStatusModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Update</span>
                      </button>
                    )}
                    {item.status_transaksi === "diproses" && item.jenis_pengiriman === "Gosend" && (
                      <button onClick={() => handleOpenStatusModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Update</span>
                      </button>
                    )}
                    {item.status_transaksi === "siap dipick-up" && item.jenis_pengiriman === "Pick Up" && (
                      <button onClick={() => handleOpenStatusModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Selesai</span>
                      </button>
                    )}
                    {item.status_transaksi === "siap dipick-up" && item.jenis_pengiriman === "Gosend" && (
                      <button onClick={() => handleOpenStatusModal(item)} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-blue-200 bg-blue-100 text-blue-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span className="w-5">Update</span>
                      </button>
                    )}
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
      <PesananModal
        modalData={modalData}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formErrors={formErrors}
        onSelectStatus={handleStatusChange}
      />
      <ModalInputJarak
        isOpen={isJarakModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        item={modalData}
        formErrors={formErrors}
      />
      <StatusModal
        isOpen={statusModalOpen}
        onClose={handleCloseModal}
        updateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export function TableTelatBayar() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Menambahkan state untuk error
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { search } = useContext(GlobalContext);

  useEffect(() => {
    GetAllTransaksiTelatBayar()
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  const handleBatal = () => {
    BatalTransaksi(data).then((response) => {
        console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            window.location.reload();
        });
    }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(data);
  const filteredRows = data.filter((item) => {
    const lowerCaseSearch = search.toLowerCase();

    const noTransaksiExists = item.no_transaksi && item.no_transaksi.toLowerCase().includes(lowerCaseSearch);
    const statusExists = item.status_transaksi && item.status_transaksi.toLowerCase().includes(lowerCaseSearch);
    const totalHargaExists = item.total_harga_transaksi && item.total_harga_transaksi.toString().toLowerCase().includes(lowerCaseSearch);
    const jenisPengirimanExists = item.jenis_pengiriman && item.jenis_pengiriman.toLowerCase().includes(lowerCaseSearch);

    return (noTransaksiExists || statusExists || totalHargaExists || jenisPengirimanExists);
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="mb-2 flex flex-col gap-12">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["No", "No Transaksi", "Total Harga", "Jenis Pengiriman", "Status"].map((el) => (
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
          {currentRows.map((item, index) => {
            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
            const className = `py-3 px-5 text-center ${index === currentRows.length - 1 ? "" : "border-b border-blue-gray-50"}`;

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
                    {item.no_transaksi}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item.total_harga_transaksi}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item.jenis_pengiriman}
                  </Typography>
                </td>
                <td className={className}>
                  {item.status_transaksi === "menunggu pembayaran" && (
                    <Chip className="text-xs" variant="gradient" value={item.status_transaksi} color="red" size="sm" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end mx-5">
          <button onClick={handleBatal} type="button" className="rounded-md font-bold uppercase border-[#e8e8e8] p-2 hover:bg-red-200 bg-red-100 text-red-600 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <span className="w-5">Batalkan Semua</span>
          </button>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
