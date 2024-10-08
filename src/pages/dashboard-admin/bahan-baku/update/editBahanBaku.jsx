import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { bahanBakuAdmin } from "../../../../validations/validation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GetAllBahanBaku, CreateBahanBaku } from "@/api/bahanBakuApi";
import { GlobalContext } from "@/context/context";
import { useParams } from "react-router-dom";
import { GetBahanBakuById, UpdateBahanBakuAdmin } from "@/api/bahanBakuApi";

export function EditBahanBaku() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [data, setData] = useState({}); // State untuk menyimpan data yang didapat
  const [formErrors, setFormErrors] = useState({});
  const navigateTo = useNavigate();
  const [bahan, setBahan] = useState([]);
  const [satuan, setSatuan] = useState("");
  const [values, setValues] = useState({});
  const [selectedBahan, setSelectedBahan] = useState("");
  const {setSuccess, success} = useContext(GlobalContext);

  useEffect(() => {
    GetBahanBakuById(id) // Fungsi API untuk mengambil data
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    GetBahanBakuById(data.id_bahan)
        .then((response) => {
            console.log(response)
            setSelectedBahan(response.nama_bahan);
        })
        .catch((err) => {
            console.log(err);
            setError(err.message);
        });
  }, [data]);

  useEffect(() => {
    GetAllBahanBaku()
        .then((response) => {
            console.log(response)
            setBahan(response);
        })
        .catch((err) => {
            console.log(err);
            setError(err.message);
        });
  }, []);

  useEffect(() => {
      const selectedBahanObj = bahan.find((item) => item.nama_bahan === selectedBahan);
      if (selectedBahanObj) {
          setSatuan(selectedBahanObj.satuan);
      } else {
          setSatuan("");
      }
  }, [selectedBahan]);

  const handleBahanChange = (e) => {
      setSelectedBahan(e.target.value);
  }; 

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
      console.log(newErrors);
      console.log(parsedBahanBaku);
      return setFormErrors(newErrors);
    } else {
         parsedBahanBaku.data.id_bahan = id;
         console.log(parsedBahanBaku);
        // parsedBahanBaku.data.id_bahan = bahan.find((item) => item.nama_bahan === parsedBahanBaku.data.nama_bahan).id_bahan;
        UpdateBahanBakuAdmin(parsedBahanBaku.data)
        .then((response) => {
            console.log(response); 
            setSuccess({bool: true, message: 'Bahan Baku berhasil diubah'});
            console.log(success);
            navigateTo('/admin/bahanBaku');
        })
        .catch((err) => {
            console.error(err);
        });
    }
    setFormErrors({});
    console.log(formErrors);
    console.log(parsedBahanBaku.data.nama_bahan);
  };

  return (
    <Card color="white" shadow={false}>
      <div className=" border rounded-xl border-gray-400 p-4 shadow-md ">
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-3">
            <div>
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
                defaultValue={data.nama_bahan}
              />
              {formErrors.nama_bahan && (
                <p className="text-red-600 font-medium">
                  {formErrors.nama_bahan}
                </p>
              )}
            </div>
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Jumlah Stok
              </Typography>
              <Input
                type="number"
                size="lg"
                name="stok_bahan"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                defaultValue={data.jumlah_stok}
              />
              {formErrors.stok_bahan && (
                <p className="text-red-600 font-medium">{formErrors.stok_bahan}</p>
              )}
            </div> */}
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
                defaultValue={data.satuan}
              />
              {formErrors.satuan && (
                <p className="text-red-600 font-medium">{formErrors.satuan}</p>
              )}
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

export default EditBahanBaku;
