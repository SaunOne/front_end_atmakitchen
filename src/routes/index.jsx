// Impor modul eksternal
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Impor komponen internal
import LayoutUser from "../pages/layouts/layout-user";

import Login from "../pages/auth/login";
import Register from '../pages/auth/register';
import Home from "../pages/userViews/home";
import Contact from "../pages/userViews/contact";
import About from "../pages/userViews/about";
import Product from "../pages/userViews/product";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutProduct from "../pages/layouts/layout-product";
import AddNewPassword from "../pages/auth/add-new-password";
// Konfigurasi router
const routes = [
  { path: "*", element: <div>Routes Not Found!</div> },
  {
    element: <LayoutUser />,
    children: [
      { path: "/", element: <Home /> },
      { element: <LayoutProduct/>,
        children:[
          {path: "/product", element: <Product /> },
        ],
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/add-new-password", element: <AddNewPassword /> },
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
