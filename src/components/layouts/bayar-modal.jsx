import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark

 } from "@fortawesome/free-solid-svg-icons";
const BayarModal = ({ isOpen, toggleModal, onSubmit, formErrors }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-20">
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white shadow-md">
                <button onClick={toggleModal} className="absolute top-3 right-3 text-lg font-bold border-none">
                    <FontAwesomeIcon icon={faXmark} className="text-2xl text-black"/>
                </button>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4 p-6">
                        <div class="py-6">
                            <h6 class=" text-black block mb-5 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-left">
                                Bukti Pembayaran
                            </h6>
                            <div class="relative h-11 w-full">
                                <input
                                    type="file"
                                    name="bukti_pembayaran"
                                    className="w-[335px] p-2 h-full font-sans text-sm font-normal transition-all border rounded-md border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        />
                                {formErrors.bukti_pembayaran && (
                                    <p className="text-red-600 font-medium">
                                    {formErrors.bukti_pembayaran}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <button type="submit" className="block w-full rounded-lg bg-green-500 py-3 px-6 text-center text-xs font-bold uppercase text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BayarModal;
