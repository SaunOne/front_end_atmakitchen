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
  
  export function AddGaji() {

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/admin/bahanBaku";
    };

    return (
       <Card color="white" shadow={false}>
        <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
              <div >
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nama Lengkap
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
                  Gender
                </Typography>
                <Select
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                >
                    <Option value="L">Laki-laki</Option>
                    <Option value="P">Perempuan</Option>
                </Select>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Jabatan
                </Typography>
                <Select
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                >
                    <Option value="mo">Manajer Operasional</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="karyawan">Karyawan</Option>
                </Select>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Gaji
                </Typography>
                <Input
                  type=""
                  size="lg"
                  placeholder="Rp."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mt-6 " >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Card>
    );
  }

  export default AddGaji;