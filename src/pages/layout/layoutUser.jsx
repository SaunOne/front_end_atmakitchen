import { Outlet } from "react-router-dom";
import Footer from "../../components/layouts/footer";
import TopNavbar from "../../components/layouts/topNavbar";
import PropTypes from "prop-types";

const LayoutUser = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar />
      <div className="a" style={{ minHeight: "800px" }}>
        {children ? children : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

// Prop `children` harus ada dan berupa node (misalnya, elemen React atau teks) yang diperlukan.
// Dengan menambahkan pengecekan, Anda akan menghindari pesan kesalahan yang menyatakan bahwa prop `children` hilang dalam validasi props.
LayoutUser.propTypes = {
  children: PropTypes.node // Hapus `.isRequired` untuk memungkinkan nilai `undefined`.
};

export default LayoutUser;
