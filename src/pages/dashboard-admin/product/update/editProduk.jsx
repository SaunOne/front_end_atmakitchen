import React, { useState, useEffect, useContext, use } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Radio,
  Textarea
} from "@material-tailwind/react";
import FormEditTitipan  from "@/components/dashboard-admin/product/update/formEditTitipan";
import  FormEditUtama  from "@/components/dashboard-admin/product/update/formEditUtama";
import FormEditHampers from "@/components/dashboard-admin/product/update/formEditHampers";
import { useParams } from "react-router-dom";
import { GetProdukById } from "@/api/produkApi";

export function EditProduk() {
  const [jenisProduk, setJenisProduk] = useState("");
  const [jenisStok, setJenisStok] = useState("");
  const [jenisProdukTitipan, setJenisProdukTitipan] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    GetProdukById(id).
    then((response) => {
      console.log(response)
      setJenisProduk(response.jenis_produk);
    })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      }).finally(() => {
        setIsLoading(false);
      }
      );

  }, []);

  useEffect(() => {
    setJenisProdukTitipan("");
  }, [jenisProduk]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card color="white" shadow={false}>
          <div className="border rounded-xl border-gray-400 p-4 shadow-md">
            <div className="mt-8 mb-2">
              {jenisProduk === "Utama" && (
                <FormEditUtama />
              )}
              {jenisProduk === "Titipan" && (
                <FormEditTitipan />
              )}
              {jenisProduk === "Hampers" && (
                <FormEditHampers />
              )}
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export default EditProduk;
