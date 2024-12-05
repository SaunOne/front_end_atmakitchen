import "./style.css";
import "../../fonts.css";
import BakingPict from "../../../assets/img/baking-pict.png";
import { CircleBrown }  from "../circle-brown";

export const Information = () => {
    return <>
        <div className="min-h-screen w-[100%] py-[50px] px-[50px] md:py-[100px] md:px-[100px]">
            <div className="md:flex ">
                <img src={BakingPict} className="md:w-[380px] mr-2" alt="" />
                <div className="bg-[#F9E4BD] h-auto w-full pt-5 px-5 pb-5 md:pt-[65px] md:pb-[40px] md:px-[75px]">
                    <h2 className="geologica-600 text-black md:text-[40px]">Jadwal Operasional Atma Kitchen</h2>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Atma Kitchen hadir untuk anda yang ingin menikmati kue berkualitas tinggi dan lezat. Kami buka setiap hari Senin hingga Minggu, dengan jam operasional yang berbeda pada hari kerja dan akhir pekan. Kami siap melayani pesanan Anda dengan sepenuh hati dan memberikan pengalaman kuliner yang tak terlupakan.
                    </p>
                    <h2 className="geologica-600 text-black md:text-[18px] mt-3">Jam Buka :</h2>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Senin - Jumat <span className="ml-[32px]"></span> 08 : 00 - 21 : 00
                    </p>
                    <p className="geologica-300 text-justify text-[#585767] mt-3">
                        Sabtu - Minggu <span className="ml-[20px]"></span> 10 : 00 - 21 : 00
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