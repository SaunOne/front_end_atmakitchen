import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../../../widgets/layout";
import { routesMO } from "../../../routes/routeData";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "../../../context";

const LayoutMO = ({ children }) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routesMO}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        brandName="Operational Manager Dashboard"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div>{children ? children : <Outlet />}</div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Dashboard.displayName = "/src/layout/dashboard.jsx";
LayoutMO.propTypes = {
  children: PropTypes.node, // Hapus `.isRequired` untuk memungkinkan nilai `undefined`.
};
export default LayoutMO;
