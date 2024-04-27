import { FaSearch } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../../components/layouts/sidebar-product";
import { useState } from "react";
// import { Product } from '../../constants/data';
// import { useEffect } from 'react';

const LayoutProduct = ({ children}) => {
    //const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     function filterData(keyword) {
    //         return Product.filter(item => {
    //             return item.title.toLowerCase().includes(keyword.toLowerCase());
    //         });
    //     }
    //     setProducts(filterData(search));
    // }, [search, products]);

    return (
        <div className="w-full p-4 m:p-10">
            <div className="p-4">
                <div className="relative flex flex-1 flex-shrink-0">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <input
                        id="search"
                        className="w-[50%] h-9 rounded-[30px] text-black py-[5px] pl-10 border-[1px] border-[#3f3f3f] text-sm outline-2 placeholder:text-gray-500 bg-[#DCB46A44]"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>

            <div className="mt-5 md:flex justify-start">
                <Sidebar />
                <div className="md:max-w-[75%]">
                    {children ? children : <Outlet />}
                </div>
            </div>
        </div>
    );
};

LayoutProduct.propTypes = {
    children: PropTypes.node
};

export default LayoutProduct;
