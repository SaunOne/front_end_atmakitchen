import "./style.css"
import "../../fonts.css";



export const Description = () => {
    return <>
        <div className="min-h-screen w-[100%] bg-desc py-[50px] px-[50px] md:py-[100px] md:px-[100px]">
            <h1 className="geologica-600 text-black text-[40px]">Kenikmatan Kue Atma Kitchen</h1>
            <p className="geologica-300 text-justify w-[70%] mt-12">
                Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku. Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku.
            </p>
            <button className="bg-[#675757] text-[#FFF0D3] geologica-600 hover:bg-[#b09595] mt-10 py-2 px-8 rounded-[50px]">
                Lihat Produk
            </button>
        </div>
    </>
}
