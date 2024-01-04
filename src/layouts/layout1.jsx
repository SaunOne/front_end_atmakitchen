import { Outlet } from "react-router-dom";

import Footer from "./comp/footer";
import TopNavbar from "./comp/topNavbar";

const Layout1 = ({ children }) => {
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
  
export default Layout1; 