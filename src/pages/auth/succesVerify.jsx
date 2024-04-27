import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const SuccesVerify = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/user'); // Asumsikan pengguna akan diarahkan ke halaman login setelah verifikasi
  };

  return (
    <>
      <div className="bg-authPage min-h-screen flex items-center justify-center w-full">
        <div className="bg-white bg-opacity-[38%] shadow-md rounded-lg px-8 py-6 w-[300px] md:w-[400px] backdrop-blur-md">
          <h1 className="text-[45px] font-bold text-center mb-6">Verifikasi Sukses</h1>
          <div className="flex flex-col items-center justify-center">
            <FaCheckCircle className="text-green-500 text-[100px]" />
            <p className="text-center text-gray-800 mt-4 mb-8">
              Email Anda telah berhasil diverifikasi!
            </p>
            <Button
              color="green"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={handleRedirect}
              className=""
            >
              Lanjutkan ke beranda
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccesVerify;
