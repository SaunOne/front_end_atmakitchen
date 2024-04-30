import {
    HomeIcon,
    UserCircleIcon,
    // TableCellsIcon,
    // InformationCircleIcon,
    // ServerStackIcon,
    RectangleStackIcon,
    BanknotesIcon,
    CurrencyDollarIcon

  } from "@heroicons/react/24/solid";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routesAdmin = [
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
              name: "addProduk",
              path: "/admin/product/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editProduk",
              path: "/admin/product/edit",
            },
          ],
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "Resep",
          path: "/resep",
        },
      ],
    },
  ];

  export const routesMO = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboard",
          path: "/mo/home",
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "Penitip",
          path: "/mo/penitip",
          pages: [ 
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "addPenitip",
              path: "/mo/penitip/add",
            },
            {
              icon: <RectangleStackIcon {...icon} />,
              name: "editProduk",
              path: "/mo/penitip/edit",
            },
          ],
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Karyawan",
          path: "/mo/staff",
        },
        {
          icon: <BanknotesIcon {...icon} />,
          name: "Pengeluaran Bahan Baku",
          path: "/mo/pengeluaran-bahan-baku",
        },
        {
          icon: <CurrencyDollarIcon {...icon} />,
          name: "Pengeluaran Lain-lain",
          path: "/mo/pengeluaran-lain-lain",
        }
      ],
    },
  ];
  
  