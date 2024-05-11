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
import { gajiKaryawan } from "@/validations/validation";
import { useState, useEffect, useContext } from "react";

  
  export function AddGaji() {
    const gender = ["Laki-laki", "Perempuan"];
    const role = ["Manajer Operasional", "Admin", "Karyawan Biasa"];
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);
      const parsedGaji = gajiKaryawan.safeParse(formDataObject);
      if (!parsedGaji.success) {
        const error = parsedGaji.error;
        let newErrors = {};
        for (const issue of error.issues) {
          newErrors = {
            ...newErrors,
            [issue.path[0]]: issue.message,
          };
        }
        console.log(newErrors);
        console.log(parsedGaji);
        return setFormErrors(newErrors);
      } else {
          // parsedGaji.data.id_bahan = bahan.find((item) => item.nama_bahan === parsedGaji.data.nama_bahan).id_bahan;
          // console.log(parsedGaji.data.id_bahan)
          CreateKaryawan(parsedGaji.data)
          .then((response) => {
              console.log(response); 
              setSuccess({bool: true, message: 'Karyawan berhasil ditambahkan'});
              console.log(success);
              navigateTo('/owner/gaji');
          })
          .catch((err) => {
              console.error(err);
          });
      }
      setFormErrors({});
      console.log(formErrors);
      console.log(parsedGaji.data.nama_bahan);
    };

    return (
       <Card color="white" shadow={false}>
        <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
              <div >
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Username
                </Typography>
                <Input
                  name="username"
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {/* {formErrors.username && (
                  <p className="text-red-600 font-medium">
                    {formErrors.username}
                  </p>
                )} */}
              </div>
              <div >
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Password
                </Typography>
                <Input
                  name="password"
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  readOnly
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nama Lengkap
                </Typography>
                <Input
                  type=""
                  name="nama_lengkap"
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {/* {formErrors.nama_lengkap && (
                  <p className="text-red-600 font-medium">
                    {formErrors.nama_lengkap}
                  </p>
                )} */}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nomor Telepon
                </Typography>
                <Input
                  type=""
                  name="no_telp"
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {/* {formErrors.no_telp && (
                  <p className="text-red-600 font-medium">
                    {formErrors.no_telp}
                  </p>
                )} */}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Email
                </Typography>
                <Input
                  type=""
                  name="email"
                  size="lg"
                  placeholder="Rp."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {/* {formErrors.email && (
                  <p className="text-red-600 font-medium">
                    {formErrors.email}
                  </p>
                )} */}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Gender
                </Typography>
                <select name="gender" size="lg" placeholder="Pilih Jenis Produk" className=" md:w-[76vh] w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800">
                    <option disabled selected>Pilih Jenis Kelamin</option>
                    {gender.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                </select>
                {/* {formErrors.gender && (
                  <p className="text-red-600 font-medium">
                    {formErrors.gender}
                  </p>
                )} */}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Tanggal Lahir
                </Typography>
                <Input
                  type="date"
                  name="tanggal_lahir"
                  size="lg"
                  placeholder="Rp."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }} 
                />
                {formErrors.tanggal_lahir && (
                  <p className="text-red-600 font-medium">
                    {formErrors.tanggal_lahir}
                  </p>
                )}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Jabatan
                </Typography>
                <select name="jabatan" size="lg" placeholder="Pilih Jenis Produk" className=" md:w-[76vh] w-full rounded border-[#acacac] border-[1px]  h-11 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800">
                    <option value="" disabled selected>Pilih Jabatan</option>
                    {role.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                </select>
                {/* {formErrors.jabatan && (
                  <p className="text-red-600 font-medium">
                    {formErrors.jabatan}
                  </p>
                )} */}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Gaji
                </Typography>
                <Input
                  type=""
                  name="gaji"
                  size="lg"
                  placeholder="Rp."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {formErrors.gaji && (
                  <p className="text-red-600 font-medium">
                    {formErrors.gaji}
                  </p>
                )}
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