import React, { useContext } from "react"; // Importing useContext correctly
import { GlobalContext } from '@/context/context';
import { FaWallet, FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const { user } = useContext(GlobalContext); // Using useContext hook correctly
    console.log(user);


    return (
        <>
            <div className="hidden md:block w-[40%] h-[1000px] px-5">
                <div className="text-black h-[660px] rounded-[15px] border-gray-400 border-[3px] bg-white shadow-lg">
                    <div className="lg:flex lg:p-7 p-4 justify-start gap-6">
                        <img className="rounded-[50px] w-[95px] h-[95px]" src={user.img} alt="User Profile"></img>
                        <div>
                            <h1 className="text-black mt-5 font-bold text-[18px]">{user.nama_lengkap}</h1>
                            <h1 className="text-black mt-2 font-semibold text-[12px]">{user.email}</h1>
                        </div>
                    </div>
                    <div className="border-b-[1px] border-gray-400"></div>
                    <div className="lg:p-8 p-4 gap-6">
                        <div className="lg:flex justify-between gap-3">
                            <div className="flex justify-start gap-3">
                                <FaWallet />
                                <h1 className="text-black font-semibold text-[14px]">Atma Wallet</h1>
                            </div>
                            <h1 className="text-black font-semibold text-[14px] lg:mt-[-2px]">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(user.jumlah_saldo)}
                            </h1>
                        </div>
                        <div className="lg:flex mt-4 justify-between gap-3">
                            <div className="flex justify-start gap-3">
                                <FaTrophy />
                                <h1 className="text-black font-semibold text-[14px]">Reward Point</h1>
                            </div>
                            <h1 className="text-black font-semibold text-[14px] lg:mt-[-2px]">
                                {user.jumlah_point} Point
                            </h1>
                        </div>
                    </div>
                    <div className="border-b-[1px] border-gray-400 "></div>
                    <div className=" lg:p-8 p-4  ">
                        <h1 className="text-black -mt-4  font-bold text-[16px]">Akun saya</h1>
                        <div className="mt-4 ml-4">
                            <NavLink
                                to="/user/profile/"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Transaksi
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">

                            <NavLink
                                to="/user/profile/edit"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Edit Profile
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <NavLink
                                to="/user/profile/edit"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Alamat
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <NavLink
                                to="/user/profile/edit"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Ubah Password
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <NavLink
                                to="/user/profile/histori-withdraw"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Withdraw
                            </NavLink>
                        </div>
                    </div>
                    <div className="border-b-[1px] border-gray-400 "></div>
                    <div className=" lg:p-8 p-4  ">
                        <h1 className="text-black -mt-4  font-bold text-[16px]">Lainnya</h1>

                        <div className="mt-4 ml-4">
                            <NavLink
                                to="/user/profile/edit"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                About us
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <NavLink
                                to="/user/profile/edit"
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Contact us
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
