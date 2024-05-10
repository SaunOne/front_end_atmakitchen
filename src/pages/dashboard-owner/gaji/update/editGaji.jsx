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
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/context/context";
import { GetAllKaryawan, GetKaryawanById, UpdateGajiKaryawan } from "@/api/gajiKaryawanApi";

  
  export function EditGaji() {
    const { id } = useParams();
    const [data, setData] = useState({}); // State untuk menyimpan data yang didapat
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();
    const {setSuccess, success} = useContext(GlobalContext);
    const [namaKaryawan, setSelectedNamaKaryawan] = useState("");

    // useEffect(() => {
    //     GetAllKaryawan()
    //         .then((response) => {
    //         console.log(response);
    //         setSelectedNamaKaryawan(response.nama_lengkap);
    //         })
    //         .catch((err) => {
    //         console.error(err);
    //         });
    //     }, [id]);

      useEffect(() => {
        GetKaryawanById(id) // Fungsi API untuk mengambil data
          .then((response) => {
            setData(response);
            console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      }, [id]);

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
          parsedGaji.data.id_user = id;
          console.log(parsedGaji);
          UpdateGajiKaryawan(parsedGaji.data)
          .then((response) => {
              console.log(response); 
              setSuccess({bool: true, message: 'Gaji karyawan berhasil diubah'});
              console.log(success);
              navigateTo('/owner/gaji');
          })
          .catch((err) => {
              console.error(err);
          });
      }
      setFormErrors({});
      console.log(formErrors);
      console.log(parsedGaji.data.gaji);
      console.log(parsedGaji.data.bonus_gaji);
    };

    return (
       <Card color="white" shadow={false}>
        <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nama Lengkap
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
                  defaultValue={data.nama_lengkap}
                  disabled
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Jabatan
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
                  defaultValue={data.jabatan}
                  disabled
                />
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
                  defaultValue={data.gaji}
                />
                {formErrors.gaji && (
                  <p className="text-red-600 font-medium">
                    {formErrors.gaji}
                  </p>
                )}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Bonus Gaji
                </Typography>
                <Input
                  type=""
                  name="bonus_gaji"
                  size="lg"
                  placeholder="Rp."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  defaultValue={data.bonus_gaji}
                />
                {formErrors.bonus_gaji && (
                  <p className="text-red-600 font-medium">
                    {formErrors.bonus_gaji}
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