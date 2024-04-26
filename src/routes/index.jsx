// Impor modul eksternal
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Impor komponen internal
import LayoutUser from "../pages/layouts/layout-user";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedResetPassword from "./ProtectedResetPassword";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";

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
import Dashboard from "../pages/layouts/layout-admin";
import DashboardMO from "../pages/layouts/layout-MO";
import { Home_admin } from "../pages/dashboard/home";
import { ProductAdmin } from "../pages/dashboard/product";
import { AddProduk } from "../pages/dashboard/addProduk";
import { AddResep } from "../pages/dashboard/addResep";
import { AddBahanBaku } from "../pages/dashboard/addBahanBaku";
import { editProduk } from "../pages/dashboard/editProduk";
import { Notifications } from "../pages/dashboard/notifications";
import { Resep } from "../pages/dashboard/resep";
import { BahanBaku } from "../pages/dashboard/bahanBaku";

// Konfigurasi router
const routes = [

  //default routes
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/",
    element: <LayoutUser/>,
    children:[
      {
        path : "/",
        element : <Home/>      
      }
    ]
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
    element: 
    // <ProtectedResetPassword>
      <AddNewPassword />,
    
  },
  {
    path: "/succes-verify",
    element: <SuccesVerify />,
  },

  //admin
  {
    path: "/admin",
    element: <Dashboard/>,
    children  : [
      {
        path : "/admin/home",
        element : <Home_admin/>
      },
      {
        path : "/admin/product",
        element : <ProductAdmin/>,
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
        path : "/admin/product/add",
        element : <AddProduk/>,
      },
      {
        path : "/admin/resep/addResep",
        element : <AddResep/>,
      },
      {
        path : "/admin/bahanBaku/addBahanBaku",
        element : <AddBahanBaku/>,
      },
    ]
  },

  //MO

  {
    path: "/mo",
    element: <DashboardMO/>,
  },

  //user
  {
    path: "/user",
    element: 
    (
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
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
