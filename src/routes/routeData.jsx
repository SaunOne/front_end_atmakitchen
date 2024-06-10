import {
    HomeIcon,
    UserCircleIcon,
    // TableCellsIcon,
    // InformationCircleIcon,
    // ServerStackIcon,
    RectangleStackIcon,
    BanknotesIcon,
    CurrencyDollarIcon,
    Bars2Icon,
    DocumentCheckIcon,
  } from "@heroicons/react/24/solid";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { 
    faBoxesStacked ,
    faScroll,
    faList,
    faMoneyBillWave,
    faCircleUser,
    faClockRotateLeft,
    faGear,
    faMoneyBillTransfer
  } from "@fortawesome/free-solid-svg-icons";
  
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
        {
          icon: <FontAwesomeIcon icon={faMoneyBillTransfer} {...icon} />,
          name: "Withdraw Saldo",
          path: "/admin/withdraw",
        },
        {
          icon: <FontAwesomeIcon icon={faClockRotateLeft} {...icon} />,
          name: "History Pesanan",
          path: "/admin/history",
        },
        {
          icon: <FontAwesomeIcon icon={faCircleUser} {...icon} />,
          name: "Customer",
          path: "/admin/customer",
        },
        // {
        //   icon: <FontAwesomeIcon icon={faList} {...icon} />,
        //   name: "Jarak Pengiriman",
        //   path: "/admin/jarakPengiriman",
        // },
        {
          icon: <FontAwesomeIcon icon={faGear} {...icon} />,
          name: "Admin Settings",
          path: "/admin/settings",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Bulanan",
          path: "/admin/laporan-penjualan-bulanan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Per Produk",
          path: "/admin/laporan-penjualan-perproduk",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Stok Bahan Baku",
          path: "/admin/laporan-stok-bahan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penggunaan Bahan Baku",
          path: "/admin/laporan-penggunaan-bahan",
        }
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
        },
        {
          icon: <BanknotesIcon {...icon} />,
          name: "Pemakaian Bahan Baku",
          path: "/mo/pemakaian-bahan-baku",
        },

        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Konfirmasi Pesanan",
          path: "/mo/konfirmasi-pesanan",
        },
        {
          icon: <FontAwesomeIcon icon={faGear} {...icon} />,
          name: "MO Settings",
          path: "/mo/settings",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Bulanan",
          path: "/mo/laporan-penjualan-bulanan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Per Produk",
          path: "/mo/laporan-penjualan-perproduk",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Stok Bahan Baku",
          path: "/mo/laporan-stok-bahan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penggunaan Bahan Baku",
          path: "/mo/laporan-penggunaan-bahan",
        }
      ],
    },
  ];
  

  export const routesOwner = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboard",
          path: "/owner/home",
        },
        {
          icon: <FontAwesomeIcon icon = {faMoneyBillWave} {...icon}/>,
          name: "Gaji",
          path: "/owner/gaji",
        },
        {
          icon: <FontAwesomeIcon icon={faGear} {...icon} />,
          name: "Owner Settings",
          path: "/owner/settings",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Bulanan",
          path: "/owner/laporan-penjualan-bulanan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penjualan Per Produk",
          path: "/owner/laporan-penjualan-perproduk",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Stok Bahan Baku",
          path: "/owner/laporan-stok-bahan",
        },
        {
          icon: <DocumentCheckIcon {...icon} />,
          name: "Laporan Penggunaan Bahan Baku",
          path: "/owner/laporan-penggunaan-bahan",
        }
      ],
    },
  ];
  
  