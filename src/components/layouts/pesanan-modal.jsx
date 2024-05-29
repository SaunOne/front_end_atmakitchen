import React, { use } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { GetKebutuhanBahanBakuByID } from "@/api/transaksiApi"

export function PesananModal({ modalData, isOpen, onClose, onInputChange, onSave, onValidChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 ">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Bayar Pesanan</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 border-none"><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="mb-4">
          <img src={`/path/to/image/${modalData.bukti_pembayaran}`} alt="Bukti Pembayaran" className="w-full mb-4" />
          <form>
            <div className="mb-4">
              <label htmlFor="jumlah_bayar" className="text-sm font-medium text-gray-700">
                Jumlah Bayar
              </label>
              <input
                type="number"
                name="jumlah_bayar"
                id="jumlah_bayar"
                onChange={onInputChange}
                className=" p-2 h-10 mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="validation" className="block text-sm font-medium text-gray-700 mb-1">
                Validasi Pembayaran
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="valid"
                  name="validation"
                  value="valid"
                  onChange={onValidChange}
                  className="mr-2"
                />
                <label htmlFor="valid" className="mr-4">Valid</label>
                <input
                  type="radio"
                  id="invalid"
                  name="validation"
                  value="invalid"
                  onChange={onValidChange}
                  className="mr-2"
                />
                <label htmlFor="invalid">Tidak Valid</label>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Tutup
          </button>
          <button onClick={onSave} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export function PesananModalMO({ modalData, isOpen, onClose, onInputChange, onSave, onValidChange, handleTolak, handleTerima }) {
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
              <button onClick={onSave} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Proses
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

