import "./style.css"
import "../../fonts.css";



export const Description = () => {
    return <>
        <div className="min-h-screen w-[100%] bg-desc py-[50px] px-[50px] md:py-[100px] md:px-[100px]">
            <h1 className="geologica-600 text-black text-[40px]">Kenikmatan Kue Atma Kitchen</h1>
            <p className="geologica-300 text-justify w-[70%] mt-12">
                Kue dari Atma Kitchen adalah perpaduan sempurna antara tekstur lembut dan rasa yang menggugah selera, dibuat dengan bahan-bahan berkualitas tinggi dan cinta dari para ahli pembuat roti kami. Setiap gigitan menghadirkan kelezatan yang kaya, dari manisnya cokelat Belgia yang meleleh di mulut hingga aroma vanila yang memikat indera. Dengan varian rasa yang beragam dan inovatif, kue kami tak hanya memanjakan lidah, tetapi juga memberikan pengalaman kuliner yang tak terlupakan, membuat setiap momen spesial Anda semakin istimewa.
            </p>
            <button className="bg-[#675757] text-[#FFF0D3] geologica-600 hover:bg-[#b09595] mt-10 py-2 px-8 rounded-[50px]">
                Lihat Produk
            </button>
        </div>
    </>
}
