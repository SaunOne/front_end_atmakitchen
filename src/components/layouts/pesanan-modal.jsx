import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function PesananModal({ modalData, isOpen, onClose, onInputChange, onSave, onValidChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 ">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Bayar Pesanan</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 border-none"><FontAwesomeIcon icon={faXmark}/></button>
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
