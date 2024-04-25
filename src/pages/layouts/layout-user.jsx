import { Outlet } from "react-router-dom";
import Footer from "../../components/layouts/footer";
import Header from "../../components/layouts/header";
import PropTypes from "prop-types";

const LayoutUser = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <div >
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
