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
import { bahanBakuAdmin } from "../../../../validations/validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
  
  export function AddBahanBaku() {
    const [formErrors, setFormErrors] = useState({});
    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);
      const parsedBahanBaku = bahanBakuAdmin.safeParse(formDataObject);
      if (!parsedBahanBaku.success) {
          const error = parsedBahanBaku.error;
          let newErrors = {};
          for (const issue of error.issues) {
              newErrors = {
                  ...newErrors,
                  [issue.path[0]]: issue.message,
              };
          }
          return setFormErrors(newErrors);

      } else {
          navigateTo('/admin/bahanBaku');
      }
      setFormErrors({});
      console.log(formErrors);
      console.log(parsedBahanBaku.data.name);
    };

    return (
       <Card color="white" shadow={false}>
        <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-3">
              <div >
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Nama Bahan
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  name="nama_bahan"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {formErrors.nama_bahan && (
                    <p className="text-red-600 font-medium">
                        {formErrors.nama_bahan}
                    </p>
                )}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Jumlah Stok
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  name="stok_bahan"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {formErrors.stok_bahan && (
                    <p className="text-red-600 font-medium">
                        {formErrors.stok}
                    </p>
                )}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Satuan
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  name="satuan"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {formErrors.satuan && (
                    <p className="text-red-600 font-medium">
                        {formErrors.satuan}
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

  export default AddBahanBaku;