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

export function ProductTable() {
  const [selectedTabValue, setSelectedTabValue] = useState("utama"); 
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(productData.length / rowsPerPage);

  // Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = productData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <div className="mt-12 mb-8 flex flex-col gap-10">
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
          <div className="flex justify-end">
              <Button onClick={() => navigate('/admin/product/add')}>Tambah</Button>
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
            {currentRows.map(
              ({ id_produk, image_produk, nama_produk, total_terjual, harga, stok_produk }, index) => {
                const className = `py-3 px-5 ${
                  index === productData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={index}>
                    <td className={className}> 
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {id_produk}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={image_produk} alt={nama_produk} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {nama_produk}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {total_terjual}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {harga}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {stok_produk}
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
        <div className="flex justify-center mt-2">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
        </CardBody>
      </Card>
    </div>
  );
}
