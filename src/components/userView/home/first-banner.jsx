import "./style.css"
import "../../fonts.css";

export const FirstBanner = () => {
    return <>
        <div className="w-full bg-hero min-h-[150vh] mx-auto pt-[190px] px-[50px] md:px-[100px]">
            <h1 className="geologica-600 text-black text-[50px]">Jajanan Enak</h1>
            <h1 className="geologica-600 text-black text-[50px]">Menunggu Mu</h1>
            <div className="mt-6 md:max-w-[566px]">
                <p className="geologica-300 text-justify">
                    Tidak seperti anggapan banyak orang, Lorem Ipsum bukanlah teks-teks yang diacak.
                    Ia berakar dari sebuah naskah sastra latin klasik dari era 45 sebelum masehi,
                    hingga bisa dipastikan usianya telah mencapai lebih dari 2000 tahun.
                    Richard McCg d
                </p>
            </div>
            <div>
                <button className="bg-[#675757] text-[#FFF0D3] geologica-600 hover:bg-[#b09595] mt-5 py-2 px-8 rounded-[50px]">
                    Lihat Produk
                </button>
            </div>
        </div>
    </>
}
