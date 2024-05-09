export default function StatusFilter  (){
    return <>
        <h1 className="text-gray-800 mt-2  font-bold text-[20px]">Status</h1>
        <div className="flex gap-4 justify-start flex-wrap">
            <div className="bg-[#FFFAED] ml-3  px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Semua</h1>
            </div>
            <div className="bg-[#FFFAED] px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Menunggu Pembayaran</h1>
            </div>
            <div className="bg-[#FFFAED] px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Menunggu Konfirmasi</h1>
            </div>
            <div className="bg-[#FFFAED] px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Diproses</h1>
            </div>
            <div className="bg-[#FFFAED] px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Selesai</h1>
            </div>
            <div className="bg-[#FFFAED] px-4 py-2 mt-[2px]  border rounded-md border-gray-400">
                <h1 className="text-gray-800 font-semibold text-[16px]">Diterima</h1>
            </div>
        </div>
    </>
}
