// Impor modul eksternal
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Impor komponen internal
import LayoutUser from "../pages/layout/layoutUser";
import ListBudaya from "../pages/listBudaya";
import Pencarian from "../pages/pencarian";
import TentangKami from "../pages/tentangkami";
import DetailBudaya from "../pages/detailBudaya";
import DaftarPustaka from "../pages/daftarpustaka";
import Beranda from "../pages/beranda";
import Login from "../pages/auth/login";
import Register from '../pages/auth/register';

// Konfigurasi router
const routes = [
  { path: "*", element: <div>Routes Not Found!</div> },
  {
    element: <LayoutUser />,
    children: [
      { path: "/", element: <Beranda /> },
      { path: "/List", element: <ListBudaya /> },
      { path: "/Detail-Budaya", element: <DetailBudaya /> },
      { path: "/Pencarian/Budaya", element: <Pencarian /> },
      { path: "/Tentang-Kami", element: <TentangKami /> },
      { path: "/Daftar-Pustaka", element: <DaftarPustaka /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
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
