import { NavLink } from "react-router-dom";
import { navBarUserProduct } from "../../constants/index.js";


const Sidebar = () => {
    return <>
        <div className="hidden md:block w-[25%] h-[800px] px-5">
            <div className="flex p-8 h-[400px] rounded bg-white  shadow-lg ">
                <div className="text-black ">
                    <h2 className="text-[18px] align-center font-bold mb-2">Kategori</h2>
                    <ul >
                        {navBarUserProduct.map((item) => (
                            <li
                                key={item._id}
                            >
                                <NavLink
                                    to={item.link}
                                    className="font-normal hover:font-bold items-center text-[15px] text-black hover:underline underline-offset-[4px] decoration-[1px] hover:text-gray-700 md:border-r-[1px] border-r-gray-300 hoverEffect last:border-r-0"
                                    state={{ data: location.pathname.split("/")[1] }}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>

    </>
}

export default Sidebar;
