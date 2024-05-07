import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../../../../components/layouts/sidebar-profile";




const LayoutProfile = ({children }) => {
    const user = {
        id: 1,
        img: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        username: "admin",
        email: "julian@gmail.com",
        nama_lengkap: "Julian",
        nama_role: "user",
        no_telp: "08123456789",
        gender: "Laki-laki",
        tanggal_lahir: "12-12-2000",
    };


    return (
        <div className="w-full p-10">
            <div className="md:flex justify-start">
                <Sidebar user={user} />
                <div>
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
