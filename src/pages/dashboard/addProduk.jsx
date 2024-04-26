import React from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";
// import { Dashboard } from "@/layouts";
  
  export function AddProduk() {

    const handleSubmit = (event) => {
      event.preventDefault();
      window.location.href = "/admin/product";
    };
    return (
       <Card color="white" shadow={false}>
        <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-4">
              <div >
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Jenis Produk
                </Typography>
                <Select
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                >
                  <Option>Produk Utama</Option>
                  <Option>Produk Titipan</Option>
                  <Option>Produk Hampers</Option>
                </Select>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nama Produk
                </Typography>
                <Input
                  
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Stok
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Harga
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mt-6 ">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Card>
    );
  }

  export default AddProduk;