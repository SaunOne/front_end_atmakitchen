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


// prop children harus ada dan berupa node (misalnya, elemen React atau teks) yang diperlukan. Dengan begitu, Anda akan menghindari pesan kesalahan yang menyatakan bahwa prop children hilang dalam validasi props.
LayoutUser.propTypes = {
  children: PropTypes.node.isRequired
};

export default LayoutUser; 
