import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home_admin, Profile, Tables, Notifications, ProductAdmin, Resep } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

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
        path: "/home",
        element: <Home_admin />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Product",
        path: "/product",
        element: <ProductAdmin />,
        pages: [ 
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "addProduk",
            path: "/product/addProduk",
            element: <addProduk />,
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "editProduk",
            path: "/editProduk",
            element: <editProduk />,
          },
        ],
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Resep",
        path: "/resep",
        element: <Resep />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp /> ,
      },
    ],
  },
];

export default routes;
