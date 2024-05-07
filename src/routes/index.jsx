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
import EditProfile from "../pages/userViews/profile/edit-profile";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutProduct from "../pages/userViews/layout.jsx/produk/layout-product";
import LayoutProfile from "@/pages/userViews/layout.jsx/profile/layout-profile";
import AddNewPassword from "../pages/auth/add-new-password";
import SuccesVerify from "../pages/auth/succesVerify";
import DashboardAdmin from "../pages/layouts/layout-admin";
import HomeAdmin from "../pages/dashboard/home";
import ProductAdmin from "../pages/dashboard/product";
import AddProduk from "../pages/dashboard/addProduk";
import AddPenitip from "@/pages/dashboard-mo/penitip/create/addPenitip";
import DashboardMO from "../pages/dashboard-mo/layout/layout-MO";
import PenitipMO from "@/pages/dashboard-mo/penitip/penitip";
import EditPenitip from "@/pages/dashboard-mo/penitip/update/editPenitip";
import { GlobalContextProvider } from "../context/context";
import StaffMO from "@/pages/dashboard-mo/staff/staff";
import EditStaff from "@/pages/dashboard-mo/staff/update/editStaff";
import AddStaff from "@/pages/dashboard-mo/staff/create/addStaff";
import PengeluaranBahanBakuMO from "@/pages/dashboard-mo/pengeluaran-bahan-baku/pengeluaranBahanBaku";
import PengeluaranLainnyaMO from "@/pages/dashboard-mo/pengeluaran-lainnya/pengeluaranLainnnya";
import AddPengeluaranBahanBakuMO from "@/pages/dashboard-mo/pengeluaran-bahan-baku/create/addPengeluaranBahanBaku";
import EditPengeluaranBahanBakuMO from "@/pages/dashboard-mo/pengeluaran-bahan-baku/update/editPengeluaranBahanBaku";
import AddPengeluaranLainnyaMO from "@/pages/dashboard-mo/pengeluaran-lainnya/create/addPengeluaranLainnya";
import EditPengeluaranLainnyaMO from "@/pages/dashboard-mo/pengeluaran-lainnya/update/editPengeluaranLainnya";

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

      {
        element: <LayoutProduct />,
        children: [
          {
            path: "/product",
            element: <Product />,
          },
        ],
      },
      //Nanti masuk ke User
      {
        element: <LayoutProfile />,
        children: [
          {
            path: "/user/profile/edit",
            element: <EditProfile />,
          },
        ],
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
        path: "/mo/pengeluaran-bahan-baku/add",
        element: <AddPengeluaranBahanBakuMO />,
      },
      {
        path: "/mo/pengeluaran-bahan-baku/edit/:id",
        element: <EditPengeluaranBahanBakuMO />,
      },
      {
        path: "/mo/pengeluaran-lain-lain/add",
        element: <AddPengeluaranLainnyaMO />,
      },
      {
        path: "/mo/pengeluaran-lain-lain",
        element: <PengeluaranLainnyaMO />,
      },
      {
        path: "/mo/pengeluaran-lain-lain/edit/:id",
        element: <EditPengeluaranLainnyaMO />,
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

      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </>
  );
};

export default AppRouter;
