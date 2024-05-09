import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  CardFooter,
  IconButton
} from "@material-tailwind/react";
import { Tabs, Tab, TabsHeader, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  productUtamaTableData,
  productTitipanTableData,
  productHampersTableData,
} from "@/data";
import { useEffect, useState } from "react";

export function ProductAdmin() {
  const [selectedTabValue, setSelectedTabValue] = useState("utama"); 
  const [productData, setProductData] = useState([]);

  const tabsProduct = [ 
    { label: "Utama", value: "utama", name: "Utama" },
    { label: "Titipan", value: "titipan", name: "Titipan" },
    { label: "Hampers", value: "hampers", name: "Hampers" }
  ];

  useEffect(() => {
    switch (selectedTabValue) {
      case "utama":
        setProductData([...productUtamaTableData]);
        break;
      case "titipan":
        setProductData([...productTitipanTableData]);
        break;
      case "hampers":
        setProductData([...productHampersTableData]); 
        break;
      default:
        setProductData([]);
        break;
    }
  }, [selectedTabValue]);

  const getTabName = (value) => {
    const selectedTab = tabsProduct.find(tab => tab.value === value);
    return selectedTab ? selectedTab.name : "";
  };

  const handleTabChange = (value) => {
    setSelectedTabValue(value);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-2 text-lg">
          <Tabs value={selectedTabValue} onChange={handleTabChange}>
            <TabsHeader>
              {tabsProduct.map(tab => (
                <Tab key={tab.value} value={tab.value} onClick={() => setSelectedTabValue(tab.value)}>
                  {tab.label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
              {["No", "Nama Produk", "Total Terjual", "Harga", "Stok", ""].map((el) => (
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
            {productData.map(
              ({ id, img, name, sales, price, stok }, key) => {
                const className = `py-3 px-5 ${
                  key === productData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={id}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {id}
                      </Typography>
                    </td>
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
                        onClick={() => navigate('/admin/product/editProduk')}
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
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
      </Card>
    </div>
  );
}

export default Tab;
