import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { FaShoppingCart, FaUserCircle, FaBell } from "react-icons/fa";
import "../fonts.css";
import logo from '../../assets/img/logo-hero.png';

// import Image from "../../designLayouts/Image";
import { navBarList } from "../../constants/index.js";
// import Flex from "../../designLayouts/Flex";

const Flex = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};
Flex.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
};

const Header = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [sidenav, setSidenav] = useState(false);
    const [category, setCategory] = useState(false);
    const [brand, setBrand] = useState(false);
    const [products, setProducts] = useState([{ nama: "kevin" }, { nama: "kevin" }, { nama: "kevin" }]);
    const location = useLocation();
    useEffect(() => {
        let ResponsiveMenu = () => {
            if (window.innerWidth < 768) {
                setShowMenu(false);
            } else {
                setProducts([{nama:"kevin"},{nama:"kevin"}])
                setShowMenu(true);
            }
        };
        ResponsiveMenu();
        window.addEventListener("resize", ResponsiveMenu);
    }, []);

    return (
        <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
            <nav className="h-full px-4 max-w-container mx-auto relative">
                <Flex className="flex items-center justify-between h-full">
                    <Link className="w-40 ml-12" to="/">
                        <div>
                            <img className="w-32 object-cover" src={logo} alt={logo} />
                        </div>
                    </Link>
                    <div className=" w-[85%] ">
                        <div className="hidden mb-2 md:flex md:justify-end items-end md:h-[35px] md:border-b-[1px] md:border-[#585767]  mr-[60px] gap-6">
                            <FaBell className="text-gray-800 w-5 h-5 mb-2" />
                            <Link to="/cart">
                                <div className="relative">
                                    <FaShoppingCart className="text-gray-800 w-5 h-5 mb-2" />
                                    {products.length > 0 && (
                                        <span className="absolute geologica-400 font-titleFont top-3 -right-2 text-[12px]  w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white bg-[#ff2e2e]">
                                            {products.length}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            <FaUserCircle className="text-gray-800 w-5 h-5 mb-2" />
                        </div>
                        <div className="flex justify-end mr-12 ">
                            {showMenu && (
                                <motion.ul
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center w-auto z-50 p-0 gap-2"
                                >
                                    <>
                                        {navBarList.map(({ _id, title, link }) => (
                                            <NavLink
                                                key={_id}
                                                className="flex font-normal hover:font-bold w-25 h-6 justify-center items-center px-10 text-base text-[#262626] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] border-r-[2px] border-r-[#5c5c5c] hoverEffect last:border-r-0"
                                                to={link}
                                                state={{ data: location.pathname.split("/")[1] }}
                                            >
                                                <li>{title}</li>
                                            </NavLink>
                                        ))}
                                    </>
                                </motion.ul>
                            )}
                            <div className="flex justify-end gap-7">
                                <FaBell className="inline-block md:hidden text-gray-800 w-5 h-5 mb-2" />
                                <Link to="/cart">
                                    <div className="relative inline-block md:hidden">
                                        <FaShoppingCart className="text-gray-800 w-5 h-5 mb-2" />
                                        {products.length > 0 && (
                                            <span className="absolute geologica-400 font-titleFont top-3 -right-2 text-[12px]  w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white bg-[#ff2e2e]">
                                                {products.length}
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                <FaUserCircle className="inline-block md:hidden text-gray-800 w-5 h-5 mb-2" />
                                <HiMenuAlt2
                                    onClick={() => setSidenav(!sidenav)}
                                    className="inline-block md:hidden text-black  cursor-pointer w-8 h-6 absolute top-6 right-4"
                                />
                            </div>

                            {sidenav && (
                                <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                                    <motion.div
                                        initial={{ x: -300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-[80%] h-full relative"
                                    >
                                        <div className="w-full h-full bg-primeColor p-6">

                                            <ul className="text-gray-200 flex flex-col gap-2">
                                                {navBarList.map((item) => (
                                                    <li
                                                        className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[1px] border-r-gray-300 hoverEffect last:border-r-0"
                                                        key={item._id}
                                                    >
                                                        <NavLink
                                                            to={item.link}
                                                            state={{ data: location.pathname.split("/")[1] }}
                                                            onClick={() => setSidenav(false)}
                                                        >
                                                            {item.title}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-4">
                                                <h1
                                                    onClick={() => setCategory(!category)}
                                                    className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                                                >
                                                    Shop by Category{" "}
                                                    <span className="text-lg">{category ? "-" : "+"}</span>
                                                </h1>
                                                {category && (
                                                    <motion.ul
                                                        initial={{ y: 15, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="text-sm flex flex-col gap-1"
                                                    >
                                                        <li className="headerSedenavLi">New Arrivals</li>
                                                        <li className="headerSedenavLi">Gudgets</li>
                                                        <li className="headerSedenavLi">Accessories</li>
                                                        <li className="headerSedenavLi">Electronics</li>
                                                        <li className="headerSedenavLi">Others</li>
                                                    </motion.ul>
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <h1
                                                    onClick={() => setBrand(!brand)}
                                                    className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                                                >
                                                    Shop by Brand
                                                    <span className="text-lg">{brand ? "-" : "+"}</span>
                                                </h1>
                                                {brand && (
                                                    <motion.ul
                                                        initial={{ y: 15, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="text-sm flex flex-col gap-1"
                                                    >
                                                        <li className="headerSedenavLi">New Arrivals</li>
                                                        <li className="headerSedenavLi">Gudgets</li>
                                                        <li className="headerSedenavLi">Accessories</li>
                                                        <li className="headerSedenavLi">Electronics</li>
                                                        <li className="headerSedenavLi">Others</li>
                                                    </motion.ul>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            onClick={() => setSidenav(false)}
                                            className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                                        >
                                            <MdClose />
                                        </span>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                    </div>

                </Flex>
            </nav>
        </div>
    );
};

export default Header;