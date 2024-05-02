import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
    Bars2Icon,
  } from "@heroicons/react/24/solid";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { 
    faBoxesStacked ,
    faScroll,
    faList
  } from "@fortawesome/free-solid-svg-icons";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/admin/home",
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "Product",
          path: "/admin/product",
          pages: [ 
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "Tambah Produk",
              path: "/admin/product/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "Edit Produk",
              path: "/admin/product/editProduk",
            },
          ],
        },
        {
          icon: <FontAwesomeIcon icon={faScroll} {...icon} />,
          name: "Resep",
          path: "/admin/resep",
          pages: [ 
            {
              icon: <FontAwesomeIcon icon={faScroll} {...icon} />,
              name: "Tambah Resep",
              path: "/admin/resep/addResep",
            },
            {
              icon: <FontAwesomeIcon icon={faScroll} {...icon} />,
              name: "Edit Resep",
              path: "/admin/resep/editResep",
            },
          ],
        },
        {
          icon: <FontAwesomeIcon icon={faBoxesStacked} {...icon} />,
          name: "Bahan Baku",
          path: "/admin/bahanBaku",
          pages: [ 
            {
              icon: <FontAwesomeIcon icon={faBoxesStacked} {...icon} />,
              name: "Tambah Bahan Baku",
              path: "/admin/bahanBaku/addBahanBaku",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "Edit Bahan Baku",
              path: "/admin/bahanBaku/editBahanBaku",
            },
          ],
        },
        {
          icon: <FontAwesomeIcon icon={faList} {...icon} />,
          name: "List Pesanan",
          path: "/admin/listPesanan",
        },
      ],
    },
    {
      layout: "dashboardMO",
      pages: 
      [

      ]
    }
  ];
  
  export default routes;
  