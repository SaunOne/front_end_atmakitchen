import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalInputJarak = ({ isOpen, onClose, onSubmit, item, formErrors }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">Jarak Pengiriman</h3>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900 border-none"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <input
              id="alamat"
              value={item.alamat?.detail_alamat || '-'}
              className="w-full h-10 px-3 py-2 font-sans text-sm border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
              Jarak Pengiriman
            </label>
            <input
              type="number"
              id="radius"
              name="radius"
              className="w-full h-10 px-3 py-2 font-sans text-sm border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {formErrors.radius && (
              <p className="text-red-600 font-medium mb-1 text-left">
                {formErrors.radius}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInputJarak;
