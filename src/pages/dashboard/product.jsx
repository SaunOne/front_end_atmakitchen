import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
    Button,
    IconButton,
    Tab,
    Tabs,
    TabsHeader,
  } from "@material-tailwind/react";
  import { NavLink } from 'react-router-dom';
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, productTableData} from "@/data";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  
<<<<<<< HEAD
  export function Product() {
=======
  export function ProductAdmin() {
>>>>>>> 3c7be9f2a806f2f2293bedaa1bf26a99e2106597
    const [selectedTabValue, setSelectedTabValue] = useState("utama"); // Nilai tab yang dipilih, diatur ke nilai default 'utama'

    const tabsProduct = [ 
      { label: "Utama", value: "utama", name: "Utama" },
      { label: "Titipan", value: "titipan", name: "Titipan" },
      { label: "Hampers", value: "hampers", name: "Hampers" }
    ];

    const getTabName = (value) => {
      const selectedTab = tabsProduct.find(tab => tab.value === value);
      return selectedTab ? selectedTab.name : "";
    };

    const handleTabChange = (value) => {
      setSelectedTabValue(value); // Mengatur nilai tab yang dipilih saat tab berubah
    };

    const navigate = useNavigate();

    return (
      <div className="mt-12 mb-8 flex flex-col gap-10">
        <div className="grid grid-cols-2 text-lg">
            <Tabs value={selectedTabValue} onChange={handleTabChange}>
                <TabsHeader className="">
                  {tabsProduct.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
            </Tabs>
            <div className="flex justify-end">
<<<<<<< HEAD
                <Button onClick={() => navigate('/dashboard/product/addProduk')}>Tambah</Button>
=======
                <Button onClick={() => navigate('/admin/product/add')}>Tambah</Button>
>>>>>>> 3c7be9f2a806f2f2293bedaa1bf26a99e2106597
            </div>
        </div>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel Produk {getTabName(selectedTabValue)}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama Produk", "Total Terjual", "Harga", "Stok", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productTableData.map(
                ({ img, name, sales, price, stok }, key) => {
                  const className = `py-3 px-5 ${
                    key === productTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {sales}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {price}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {stok}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href=""
                          className="text-xs font-semibold text-blue-gray-600"
                          onClick={() => navigate('/dashboard/product/editProduk')}
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
<<<<<<< HEAD
  export default Product;
=======
  export default ProductAdmin;
>>>>>>> 3c7be9f2a806f2f2293bedaa1bf26a99e2106597
  