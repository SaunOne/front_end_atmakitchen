import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../../../components/layouts/sidebar-product";

const LayoutUser = ({ children }) => {
    return (
        <div className="w-full p-10">
            <div className="md:flex justify-start">
                <Sidebar/>
                <div >
                    {children ? children : <Outlet />}
                </div>
            </div>


        </div>
    );
};

// Prop `children` harus ada dan berupa node (misalnya, elemen React atau teks) yang diperlukan.
// Dengan menambahkan pengecekan, Anda akan menghindari pesan kesalahan yang menyatakan bahwa prop `children` hilang dalam validasi props.
LayoutUser.propTypes = {
    children: PropTypes.node // Hapus `.isRequired` untuk memungkinkan nilai `undefined`.
};

export default LayoutUser;