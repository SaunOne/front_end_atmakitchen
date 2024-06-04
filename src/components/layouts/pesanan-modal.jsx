import React, { use } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { GetKebutuhanBahanBakuByID } from "@/api/transaksiApi"
import { getImage } from "@/api";

export function PesananModal({ modalData, isOpen, onClose, onSubmit, formErrors, onSelectStatus }) {
  if (!isOpen) return null;

  const handleStatusChange = (e) => {
    onSelectStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white max-h-[500px] max-w-[500px] overflow-auto   rounded-lg p-6 w-1/3 ">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Bayar Pesanan</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 border-none"><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="mb-4">
          <img src={getImage(modalData.bukti_pembayaran)} alt="Bukti Pembayaran" className="overflow-auto w-full mb-4" />
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="jumlah_bayar" className="text-sm font-medium text-gray-700">
                Jumlah Bayar
              </label>
              <input
                type="number"
                name="jumlah_pembayaran"
                id="jumlah_pemabayaran"
                className=" p-2 h-10 mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {formErrors.jumlah_pembayaran && (
                <p className="text-red-600 font-medium mb-1 text-left">
                  {formErrors.jumlah_pembayaran}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="validation" className="block text-sm font-medium text-gray-700 mb-1">
                Validasi Pembayaran
              </label>
              <div className="flex items-center">
                <select className=" border rounded-md border-gray p-2 w-[110vh]" name="status" id="status" onChange={handleStatusChange}>
                  <option value="" selected disabled>Pilih Validasi</option>
                  <option value="pembayaran valid">Valid</option>
                  <option value="pembayaran tidak valid">Invalid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Tutup
              </button>
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Validasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PesananModalMO({ modalData, isOpen, onClose, onInputChange, onSave, onValidChange, handleProses, handleTolak, handleTerima }) {
  if (!isOpen) return null;
  if (!modalData) return null;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(modalData)

  useEffect(() => {
    GetKebutuhanBahanBakuByID(modalData.id_transaksi)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);



  return (
    <>
      {modalData.status_transaksi === 'pembayaran valid' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 relative">
            <button onClick={onClose} className="absolute  top-2 right-2 text-gray-500 text-[35px]  hover:text-gray-700">
              &times;
            </button>
            <h1 className="text-black mt-2 font-bold text-[20px]">Konfirmasi Pesanan</h1>
            <div className="pt-6  min-h-[100px]">
              
              {isLoading ? (
                "Data sedang dimuat..."
              ) : (
                <>
                <h1 className="text-black font-semibold text-[14px] mb-4">Daftar Kekurangan Bahan Baku:</h1>
                  {data && data.length > 0 ? (
                    <div>
                      {data.map((item, index) => (
                        <p key={index} className="text-red text-[14px] font-semibold">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <h1 className="text-black text-[14px] font-semibold">
                      Tidak ada kekurangan stok bahan baku pada pesanan ini.
                    </h1>
                  )}

                  
                </>
              )}



            </div>
            <div className="flex justify-center">
              <button onClick={() => handleTolak(modalData)} className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Tolak
              </button>
              <button onClick={() => handleTerima(modalData)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Terima
              </button>
            </div>
          </div>
        </div>
      )}

      {modalData.status_transaksi === 'diterima' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 ">
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Keluar
              </button>
              <button onClick={() => handleProses(modalData)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Proses
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

