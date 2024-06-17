import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NotaPDF from './nota-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CetakNota } from "@/api/customersApi";
import logo from '@/assets/img/logo-hero.png';

const NotaModal = ({ isOpen, toggleModal, notaId }) => {
  const [notaData, setNotaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotaData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await CetakNota(notaId);
        console.log(notaId);
        console.log(data)
        setNotaData(data.data);
      } catch (err) {
        setError('Error fetching nota data');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchNotaData();
    }
  }, [isOpen, notaId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[80%] md:w-[50%] max-h-[95vh] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={toggleModal} className="text-black hover:text-gray-600 border-none pb-2">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div>
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <img src={logo} alt="Logo" className="h-12" />
              </div>
              <div className="text-black">
                <h1 className="font-bold text-lg">ATMA KITCHEN</h1>
                <p>Jl. Centralpark No 10 Yogyakarta</p>
                <p>0883-123-3123</p>
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              notaData && (
                <>
                  <div className="mb-4">
                    <h2 className="font-bold text-xl mb-2 text-black">PEMESANAN CAKE</h2>
                    <div className="grid grid-cols-2 gap-4 text-black">
                      <div>
                        <p>No Nota: {notaData.no_nota}</p>
                        <p>Tanggal Pesan: {new Date(notaData.tanggal_pesan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>Lunas Pada: {new Date(notaData.tanggal_pelunasan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>Tanggal Ambil: {new Date(notaData.tanggal_pengambilan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p>Pemesan:</p>
                        <p>{notaData.nama_lengkap}</p>
                        <p>{notaData.email}</p>
                        <p>{notaData.alamat}</p>
                      </div>
                    </div>
                  </div>
                  <table className="w-full border-collapse border border-gray-300 text-black overflow-auto">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">NO</th>
                        <th className="border border-gray-300 p-2">ITEM</th>
                        <th className="border border-gray-300 p-2">JML</th>
                        <th className="border border-gray-300 p-2">SATUAN</th>
                        <th className="border border-gray-300 p-2">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notaData.produk?.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{index + 1}</td>
                          <td className="border border-gray-300 p-2">{item.nama_produk}</td>
                          <td className="border border-gray-300 p-2">{item.jumlah_produk}</td>
                          <td className="border border-gray-300 p-2">pcs</td>
                          <td className="border border-gray-300 p-2">{item.jumlah_produk * item.harga}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between mt-4 text-black">
                    <div>
                      <p>Point dari pesanan ini: {notaData.poin_pesanan}</p>
                      <p>Total Point Customer: {notaData.point_customer}</p>
                    </div>
                    <div className="w-1/2">
                      <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">TOTAL SEBELUM ONGKIR</td>
                            <td className="border border-gray-300 p-2">{notaData.total_sebelum_ongkir}</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">ONGKIR (Rad 5Km)</td>
                            <td className="border border-gray-300 p-2">{notaData.ongkir}</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">TOTAL SETELAH ONGKIR</td>
                            <td className="border border-gray-300 p-2">{notaData.total_setelah_ongkir}</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">POTONGAN POINT</td>
                            <td className="border border-gray-300 p-2">{notaData.point_terpakai}</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">TOTAL</td>
                            <td className="border border-gray-300 p-2">{notaData.total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-black">
                    <p>TERIMA KASIH SUDAH BERBELANJA</p>
                  </div>
                  <PDFDownloadLink
                    document={<NotaPDF notaData={notaData} />}
                    fileName="nota.pdf"
                  >
                    {({ loading }) => (
                      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        {loading ? 'Loading PDF...' : 'Download PDF'}
                      </button>
                    )}
                  </PDFDownloadLink>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaModal;
