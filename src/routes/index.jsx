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

// Konfigurasi router
const routes = [
  { path: "*", element: <div>Routes Not Found!</div> },
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      { path: "List", element: <ListBudaya /> },
      { path: "Detail-Budaya", element: <DetailBudaya /> },
      { path: "Pencarian/Budaya", element: <Pencarian /> },
      { path: "Tentang-Kami", element: <TentangKami /> },
      { path: "Daftar-Pustaka", element: <DaftarPustaka /> },
      { path: "/", element: <Beranda /> },
    ],
  },
  { path: "/login", element: <Login /> },
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
