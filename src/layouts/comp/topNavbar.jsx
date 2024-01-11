import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';

const TopNavbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className={`nav w-screen ${isDropdownOpen ? 'bg-nav' : 'bg-transparent'} absolute top-0 flex justify-between text-nav px-10  transition-all duration-300 `}>
                <div className="web-name flex-1 justify-start h-14 flex items-center">
                    <a href="/" className="text-white hover:text-white font-normal">budayakita.id</a>
                </div>
                <div className="center-nav flex items-center">
                    <ul className="flex space-x-20 decoration-white items-center">
                        <li><a className="text-white hover:text-white font-normal" href="/Tentang-Kami">Tentang Kami</a></li>
                        <li>
                            <button
                                onClick={toggleDropdown}
                                className="bg-inherit text-white hover:text-white border-none focus:outline-none font-normal"
                                id="menu-button"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <div className="flex items-center">
                                    Budaya Indonesia <RiArrowDropDownLine className="size-8" />
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="search flex-1 px-4 flex items-center justify-end">
                    <a className="text-white hover:text-white inline-block" href="/Pencarian/Budaya">
                        <span>
                            <IoIosSearch className="size-8" />
                        </span>
                    </a>
                </div>
            </div>

            {/* Dropdown */}
            <div
                className={`absolute top-12 w-screen left-0 z-10 mt-2 origin-top-right bg-gradient-to-t from-brigth-nav to-nav shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
            >
                <div className="bg-white h-px"></div>
                <div className="px-10 h-60 pt-6" role="none">
                    <h1 className="font-bold text-titlebudaya">Budaya Indonesia</h1>
                    <div className="">
                        <ul className="inline-block mr-28 align-top">
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Rumah Adat</a></li>
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Tradisi Daerah</a></li>
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Wayang</a></li>
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Pakaian Adat</a></li>
                        </ul>
                        <ul className="inline-block align-top">
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Rumah Adat</a></li>
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Musik Daerah</a></li>
                            <li className="mt-1"><a className="text-white hover:text-white font-normal" href="/List">Makanan Daerah</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopNavbar;

