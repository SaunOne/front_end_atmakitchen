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
import DashboardAdmin from "../pages/dashboard-admin/layout/layout-admin";
import HomeAdmin from "../pages/dashboard-admin/home";
import ProductAdmin from "../pages/dashboard-admin/product/product";
import AddProduk from "../pages/dashboard-admin/product/create/addProduk";
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
import DaftarTransaksi from "../pages/userViews/profile/daftar-transaksi";


import HistoriWithdraw from "../pages/userViews/profile/histori-withdraw";

import { AddResep } from "../pages/dashboard-admin/resep/create/addResep";
import { AddBahanBaku } from "../pages/dashboard-admin/bahan-baku/create/addBahanBaku";
//import { Notifications } from "../pages/dashboard-admin/notifications";
import { Resep } from "../pages/dashboard-admin/resep/resep";
import { BahanBaku } from "../pages/dashboard-admin/bahan-baku/bahanBaku";
import { ListPesanan } from "../pages/dashboard-admin/list-pesanan/listPesanan";
import { EditProduk } from "../pages/dashboard-admin/product/update/editProduk";
import { EditResep } from "../pages/dashboard-admin/resep/update/editResep";
import { EditBahanBaku } from "../pages/dashboard-admin/bahan-baku/update/editBahanBaku";
import DashboardOwner from "../pages/dashboard-owner/layout/layout-owner";
import HomeOwner from "../pages/dashboard-owner/home";
import Gaji from "../pages/dashboard-owner/gaji/gaji";
import AddGaji from "../pages/dashboard-owner/gaji/create/addGaji";
import ListCustomer from "@/pages/dashboard-admin/customer/customer";
import { HistoryPesananCustomer } from "@/pages/dashboard-admin/customer/history";
import { EditGaji } from "@/pages/dashboard-owner/gaji/update/editGaji";
import { EditAdmin } from "@/pages/dashboard-admin/admin/admin-settings";

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
            path: "/user/profile/",
            element: <DaftarTransaksi />,
          },
          {
            path: "/user/profile/edit",
            element: <EditProfile />,
          },
          {
            path: "/user/profile/histori-withdraw",
            element: <HistoriWithdraw />,
          }
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
        path : "/admin/resep",
        element : <Resep/>,
      },
      {
        path : "/admin/bahanBaku",
        element : <BahanBaku/>,
      },
      {
        path : "/admin/listPesanan",
        element : <ListPesanan/>,
      },
      {
        path : "/admin/resep",
        element : <Resep/>,
      },
      {
        path : "/admin/bahanBaku",
        element : <BahanBaku/>,
      },
      {
        path : "/admin/listPesanan",
        element : <ListPesanan/>,
      },
      {
        path : "/admin/customer",
        element : <ListCustomer/>,
      },
      {
        path : "/admin/history",
        element : <HistoryPesananCustomer/>,
      },
      {
        path : "/admin/settings",
        element : <EditAdmin/>,
      },
      {
        path : "/admin/product/add",
        element : <AddProduk/>,
      },
      {
        path : "/admin/product/editProduk",
        element : <EditProduk/>,
      },
      {
        path : "/admin/resep/addResep",
        element : <AddResep/>,
      },
      {
        path : "/admin/resep/editResep",
        element : <EditResep/>,
      },
      {
        path : "/admin/bahanBaku/addBahanBaku",
        element : <AddBahanBaku/>,
      },
      {
        path : "/admin/bahanBaku/editBahanBaku/:id",
        element : <EditBahanBaku/>,
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

  //OWNER

  {
    path: "/owner",
    element: <DashboardOwner/>,
    children: [
      {
        path: "/owner/home",
        element: <HomeOwner/>
      },
      {
        path: "/owner/gaji",
        element: <Gaji />,
      },
      {
        path: "/owner/gaji/add",
        element: <AddGaji />,
      },
      {
        path: "/owner/gaji/editGaji/:id",
        element: <EditGaji />,
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
        <ToastContainer />
      </GlobalContextProvider>
    </>
  );
};

export default AppRouter;
