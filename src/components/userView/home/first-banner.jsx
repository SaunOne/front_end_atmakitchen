import "./style.css"
import "../../fonts.css";

export const FirstBanner = () => {
    return <>
        <div className="w-full bg-hero min-h-[150vh] mx-auto pt-[190px] px-[50px] md:px-[100px]">
            <h1 className="geologica-600 text-black text-[50px]">Jajanan Enak</h1>
            <h1 className="geologica-600 text-black text-[50px]">Menunggu Mu</h1>
            <div className="mt-6 md:max-w-[566px]">
                <p className="geologica-300 text-justify">
                    <b>Atma Kitchen</b> adalah bakery online yang menghadirkan kue, pastry, minuman dan camilan lainnya langsung ke pintu rumah Anda. Dibuat dengan cinta dan bahan-bahan berkualitas tinggi, setiap produk kami diolah dengan tangan ahli untuk memastikan setiap gigitan penuh dengan kelezatan yang tak tertandingi.
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
