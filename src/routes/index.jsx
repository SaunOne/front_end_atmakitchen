// Impor modul eksternal
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Impor komponen internal
import LayoutUser from "../pages/userViews/layout.jsx/layout-user";
import ProtectedRoutes from "./ProtectedRoutes";
//import ProtectedResetPassword from "./ProtectedResetPassword";
//import Footer from "../components/layouts/footer";
//import Header from "../components/layouts/header";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/userViews/home";
import Contact from "../pages/userViews/contact";
import About from "../pages/userViews/about";
import Product from "../pages/userViews/product";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutProduct from "../pages/layouts/produk/layout-product";
import AddNewPassword from "../pages/auth/add-new-password";
import SuccesVerify from "../pages/auth/succesVerify";
import DashboardAdmin from "../pages/layouts/layout-admin";
import HomeAdmin from "../pages/dashboard-admin/home";
import ProductAdmin from "../pages/dashboard-admin/product/product";
import { AddProduk } from "../pages/dashboard-admin/product/addProduk";
import AddPenitip from "@/pages/dashboard-mo/penitip/create/addPenitip";
import DashboardMO from "../pages/dashboard-mo/layout/layout-MO";
import PenitipMO from "@/pages/dashboard-mo/penitip/penitip";
import EditPenitip from "@/pages/dashboard-mo/penitip/update/editPenitip";
import { SearchProvider } from "../context/searchContext";
import StaffMO from "@/pages/dashboard-mo/staff/staff";
import EditStaff from "@/pages/dashboard-mo/staff/update/editStaff";
import AddStaff from "@/pages/dashboard-mo/staff/create/addStaff";
import PengeluaranBahanBakuMO from "@/pages/dashboard-mo/pengeluaran-bahan-baku/pengeluaranBahanBaku";
import PengeluaranLainnyaMO from "@/pages/dashboard-mo/pengeluaran-lainnya/pengeluaranLainnnya";


//import { editProduk } from "../pages/dashboard-admin/editProduk";
//import { Notifications } from "../pages/dashboard-admin/notifications";

// Konfigurasi router
const routes = [
  //default routes
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  //guest
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/add-new-password",
    element: (
      // <ProtectedResetPassword>
      <AddNewPassword />
    ),
  },
  {
    path: "/succes-verify",
    element: <SuccesVerify />,
  },

  //admin
  {
    path: "/admin",
    element: <DashboardAdmin />,
    children: [
      {
        path: "/admin/home",
        element: <HomeAdmin />,
      },
      {
        path: "/admin/product",
        element: <ProductAdmin />,
      },
      {
        path: "/admin/product/add",
        element: <AddProduk />,
      },
    ],
  },

  {
    path: "/mo",
    element: <DashboardMO />,
    children: [
      {
        path: "/mo/penitip",
        element: <PenitipMO />,
      },
      {
        path: "/mo/penitip/add",
        element: <AddPenitip />,
      },
      {
        path: "/mo/penitip/edit/:id",
        element: <EditPenitip />,
      },
      {
        path: "/mo/staff",
        element: <StaffMO />,
      },
      {
        path: "/mo/staff/add",
        element: <AddStaff />,
      },
      {
        path: "/mo/staff/edit/:id",
        element: <EditStaff />,
      },
      {
        path: "/mo/pengeluaran-bahan-baku",
        element: <PengeluaranBahanBakuMO />,
      },
      {
        path: "/mo/pengeluaran-lain-lain",
        element: <PengeluaranLainnyaMO />,
      },
    ],
  },

  //user
  {
    path: "/user",
    element: (
      <ProtectedRoutes>
        <LayoutUser />
      </ProtectedRoutes>
    ),

    children: [
      {
        path: "/user",
        element: <Home />,
      },
      {
        element: <LayoutProduct />,
        children: [
          {
            path: "/user/product",
            element: <Product />,
          },
        ],
      },
      {
        path: "/user/about",
        element: <About />,
      },
      {
        path: "/user/contact",
        element: <Contact />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

// Komponen AppRouter
const AppRouter = () => {
  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
};

export default AppRouter;
