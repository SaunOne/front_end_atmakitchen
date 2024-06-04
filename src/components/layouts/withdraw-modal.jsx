import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { GetWithdrawUserById } from "@/api/customersApi"
import { getImage } from "@/api";

export function WithdrawModal({isOpen, onClose, onSubmit, id, handleTolak, handleTerima}) {
  if (!isOpen) return null;

  const [data, setData] = useState([]);

  useEffect(() => {
    GetWithdrawUserById(id)
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white max-h-[500px] max-w-[500px] overflow-auto   rounded-lg p-6 w-1/3 ">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Withdraw</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 border-none"><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="mb-4">
            <div className="mb-4">
                <label htmlFor="jumlah_bayar" className="text-sm font-medium text-gray-700">
                    Jumlah Withdraw
                </label>
                <input
                    value={data.jumlah}
                    className=" p-2 h-10 mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                />
            </div>
            <div className="mb-4">
                <label htmlFor="jumlah_bayar" className="text-sm font-medium text-gray-700">
                    Nama Bank
                </label>
                <input
                    value={data.nama_bank}
                    className=" p-2 h-10 mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                />
            </div>
            <div className="mb-4">
                <label htmlFor="jumlah_bayar" className="text-sm font-medium text-gray-700">
                    Nomor Rekening
                </label>
                <input
                    value={data.no_rek}
                    className=" p-2 h-10 mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                />
            </div>
            <div className="flex justify-end">
              <button onClick={handleTolak} className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Tolak
              </button>
              <button onClick={handleTerima} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Terima
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}