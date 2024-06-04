import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const StatusModal = ({ isOpen, onClose, onSubmit, updateStatus}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-lg p-6 w-1/3">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-lg font-semibold"></h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-600 hover:text-gray-900 border-none"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className='mb-2 font-semibold'>
                <p>Apakah yakin ingin mengupdate status?</p>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="mr-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={updateStatus}
                >
                    OK
                </button>
            </div>
        </div>
    </div>
  );
};

export default StatusModal;
