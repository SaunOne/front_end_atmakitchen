import React from "react"; // Add the missing import statement

import { NavLink } from "react-router-dom";

const Sidebar = ({user}) => {
    console.log(user);
    
    return <>
        <div className="hidden md:block w-[30%] h-[800px] px-5">
            <div className="flex p-8 h-[400px] rounded bg-white  shadow-lg ">
                <div className="text-black flex justify-start gap-4">
                </div>
            </div>
        </div>
    </>
}

export default Sidebar;
