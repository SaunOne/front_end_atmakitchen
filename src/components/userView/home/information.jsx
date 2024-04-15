import "./style.css";
import "../../fonts.css";
import BakingPict from "../../../assets/img/baking-pict.png";
import { CircleBrown }  from "../circle-brown";

export const Information = () => {
    return <>
        <div className="min-h-screen py-[50px] px-[50px] md:py-[100px] md:px-[100px]">
            <div className="md:flex ">
                <img src={BakingPict} className="md:w-[380px] mr-2" alt="" />
                <div className="bg-[#F9E4BD] h-auto w-full pt-5 px-5 pb-5 md:pt-[65px] md:pb-[40px] md:px-[75px]">
                    <h2 className="geologica-600 text-black md:text-[40px]">Kenikmatan Kue Atma Kitchen </h2>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an,
                    </p>
                    <h2 className="geologica-600 text-black md:text-[18px] mt-3">Jam Buka :</h2>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Senin - Jumat <span className="ml-[32px]"></span> 08 : 00 - 17 : 00
                    </p>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Sabtu - Minggu <span className="ml-[20px]"></span> 09 : 00 - 21 : 00
                    </p>
                    <div className="hidden md:flex gap-3">
                        <CircleBrown/>
                        <CircleBrown/>
                        <CircleBrown/>
                    </div>
                </div>
            </div>
        </div>
    </>
}