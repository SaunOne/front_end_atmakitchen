import React, { useEffect, useState } from "react"; // Importing useContext correctly
import { GlobalContext } from '@/context/global_context';
import { FaWallet, FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { GetUserProfile } from "@/api/customersApi";
import NotaModal from "./nota-modal";
import { getImage } from "@/api";

const Sidebar = () => {

    const [user, setUser] = useState({}); // Using useContext hook correctly
    // const { user } = useContext(GlobalContext); // Using useContext hook correctly
    console.log(user);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetUserProfile()
            .then((response) => {
                setUser(response.data);
                console.log(response.data.jumlah_point);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>

            <div className="hidden md:block w-[40%] h-[1000px] px-5">
                <div className="text-black h-[660px] rounded-[15px] border-gray-400 border-[3px] bg-white shadow-lg">
                    {/* {
                        isLoading ? (
                            <h1>Loading...</h1>
                        ) : ( */}
                            <div>
                                <div className="lg:flex lg:p-7 p-4 justify-start gap-6">
                                    <img className="rounded-[50px] w-[95px] h-[95px]" src={getImage(user.img)} alt="User Profile" />
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
                                            }).format(user.jumlah_saldo ? user.jumlah_saldo : 0)}
                                        </h1>
                                    </div>
                                    <div className="lg:flex mt-4 justify-between gap-3">
                                        <div className="flex justify-start gap-3">
                                            <FaTrophy />
                                            <h1 className="text-black font-semibold text-[14px]">Reward Point</h1>
                                        </div>
                                        <h1 className="text-black font-semibold text-[14px] lg:mt-[-2px]">
                                            {user.jumlah_point ? user.jumlah_point : 0} Point
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        {/* )
                    } */}


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
                                to="/user/profile/alamat"
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
                                to=""
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                About us
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <NavLink
                                to=""
                                className="text-black font-semibold text-[14px]  hover:text-blue-500"
                            >
                                Contact us
                            </NavLink>
                        </div>
                        <div className="mt-2 ml-4">
                            <button onClick={toggleModal} className="text-black font-semibold text-[14px] hover:text-blue-500">
                                Nota
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <NotaModal isOpen={isModalOpen} toggleModal={toggleModal} />}
        </>
    );
}

export default Sidebar;
