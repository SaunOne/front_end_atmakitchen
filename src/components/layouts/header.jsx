import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import logo from '../../assets/img/logo-hero.png';
import { FaShoppingCart, FaUserCircle, FaBell } from "react-icons/fa";
import { navBarList } from "../../constants/index.js";
import "../fonts.css";
import "./style.css";

const Header = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [sidenav, setSidenav] = useState(false);
    const [category, setCategory] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [products, setProducts] = useState([{ nama: "kevin" }, { nama: "kevin" }, { nama: "kevin" }]);
    const location = useLocation();
    useEffect(() => {
        let ResponsiveMenu = () => {
            if (window.innerWidth < 768) {
                setShowMenu(false);
                setShowDropdown(false);
                setProducts([{ nama: "kevin" }, { nama: "kevin" }])
            } else {
                setShowDropdown2(false);
                setShowMenu(true);
                setSidenav(false);
            }
        };
        ResponsiveMenu();
        window.addEventListener("resize", ResponsiveMenu);
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // 2. Fungsi untuk toggle dropdown
    };

    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2); // 2. Fungsi untuk toggle dropdown
    };

    return (
        <div className="w-full h-[90px] pb-2 pt-2 bg-[#fff6ec] sticky top-0 z-50 border-b-[1px] border-b-gray-200 shadow-lg">
            <nav className="h-full px-4 max-w-container mx-auto relative">
                <Flex className="flex items-center justify-between h-full">
                    <Link className="w-40 ml-12" to="/">
                        <div>
                            <img className="w-32 object-cover" src={logo} alt={logo} />
                        </div>
                    </Link>
                    <div className=" w-[85%] ">
                        <div className="hidden mb-2 md:flex md:justify-end items-end md:h-[35px] md:border-b-[1px] md:border-[#9694ae]  mr-[60px] gap-6">
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

                            <div className="relative">
                                <FaUserCircle
                                    className="text-gray-800 w-5 h-5 mb-2 cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {showDropdown && (
                                    <div className="absolute z-2 top-8 right-0 bg-white shadow-md rounded-md">
                                        <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
                                        <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mr-12 ">
                            {showMenu && (
                                <motion.ul
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center w-auto z-1 p-0 gap-2"
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
                            <div className="flex mt-3 justify-end gap-7">
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

                                <div className="relative"> {/* 3. Tambahkan dropdown */}
                                    <FaUserCircle
                                        className="inline-block md:hidden text-gray-800 w-5 h-5 mb-2 cursor-pointer"
                                        onClick={toggleDropdown2} // Panggil fungsi untuk menampilkan dropdown
                                    />
                                    {showDropdown2 && ( // Tampilkan dropdown jika showDropdown bernilai true
                                        <div className="absolute top-8 right-0 bg-white shadow-md rounded-md">
                                            <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
                                            <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                                        </div>
                                    )}
                                </div>

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
                                        className="w-[70%] h-full relative"
                                    >
                                        <div className="w-full h-full bg-[#675757] p-6">
                                            <div className="inline-block h-auto p-4 mb-5 bg-[#F9E4BD] rounded-[20px]">
                                                <img className="w-25 object-cover" src={logo} alt={logo} />
                                            </div>
                                            <ul className="text-gray-200 flex flex-col gap-2">
                                                {navBarList.map((item) => (
                                                    <li

                                                        key={item._id}
                                                    >
                                                        <NavLink
                                                            to={item.link}
                                                            className="font-normal hover:font-bold items-center text-[20px] text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[1px] border-r-gray-300 hoverEffect last:border-r-0"
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
                                                    className="flex justify-between text-[20px] cursor-pointer items-center font-titleFont mb-2"
                                                >
                                                    Kategori Produk{" "}
                                                    <span className="text-lg">{category ? "-" : "+"}</span>
                                                </h1>
                                                {category && (
                                                    <motion.ul
                                                        initial={{ y: 15, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="text-sm flex flex-col gap-1"
                                                    >
                                                        <li className="headerSedenavLi ml-5">New Arrivals</li>
                                                        <li className="headerSedenavLi ml-5">Gudgets</li>
                                                        <li className="headerSedenavLi ml-5">Accessories</li>
                                                        <li className="headerSedenavLi ml-5">Electronics</li>
                                                        <li className="headerSedenavLi ml-5">Others</li>
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


const Flex = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};
Flex.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
};

export default Header;
