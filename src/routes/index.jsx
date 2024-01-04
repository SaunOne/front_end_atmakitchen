import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout1 from "../layouts/layout1";
import ListBudaya from "../pages/listBudaya";
import Pencarian from "../pages/pencarian";
import TentangKami from "../pages/tentangkami";
import DetailBudaya from "../pages/detailBudaya";
import DaftarPustaka from "../pages/daftarpustaka";
import Beranda from "../pages/beranda";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path : "/",
    element :(
      
      <Layout1 />
    ),

    children : [
      {
        path : "/List",
        element : <ListBudaya />,
      },
      {
        path : "/Detail-Budaya",
        element : <DetailBudaya />,
      },
      {
        path : "/Pencarian/Budaya",
        element : <Pencarian />,
      },
      {
        path : "/Tentang-Kami",
        element : <TentangKami />,
      },
      {
        path : "/Daftar-Pustaka",
        element : <DaftarPustaka />,
      },
      {
        path : "/",
        element : <Beranda />,
      },
    ]
  },

]);
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
