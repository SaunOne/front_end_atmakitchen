import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../../../../components/layouts/sidebar-profile";




const LayoutProfile = ({children }) => {
   


    return (
        <div className="w-full p-10">
            <div className="md:flex justify-start">
                <Sidebar />
                <div className="w-full">
                    {children ? children : <Outlet />}
                </div>
            </div>
        </div>
    );
};

LayoutProfile.propTypes = { // Menambahkan prop `user` dengan tipe array of object
    children: PropTypes.node
};

export default LayoutProfile;
