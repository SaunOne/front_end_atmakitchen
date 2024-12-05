import React, { useState, useEffect, useContext } from "react";
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
import { FormAddUtamaBaru, FormAddUtamaLama } from "@/components/dashboard-admin/product/create/formAddUtama";
import { FormAddTitipanBaru, FormAddTitipanLama } from "@/components/dashboard-admin/product/create/formAddTitipan";
import FormAddHampers from "@/components/dashboard-admin/product/create/formAddHampers";

export function AddProduk() {
  const [jenisProduk, setJenisProduk] = useState("");
  const [jenisStok, setJenisStok] = useState("");
  const [jenisProdukTitipan, setJenisProdukTitipan] = useState("");

  useEffect(() => {
    setJenisStok("");
  }, [jenisProduk]);

  useEffect(() => {
    setJenisProdukTitipan("");
  }, [jenisProduk]);

  return (
    <Card color="white" shadow={false}>
      <div className="border rounded-xl border-gray-400 p-4 shadow-md">
        <div className="mt-8 mb-2">
          <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Jenis Produk
              </Typography>
              <Select
                size="lg"
                placeholder=""
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setJenisProduk(e.target ? e.target.value : e)}
              >
                <Option value="produk utama">Produk Utama</Option>
                <Option value="produk titipan">Produk Titipan</Option>
                <Option value="produk hampers">Produk Hampers</Option>
              </Select>
            </div>
            {jenisProduk === "produk utama" && (
              <div className="mt-8 flex gap-10">
                <Radio name="jenisStok" label="Stok Lama" value="stok lama" onChange={(e) => setJenisStok(e.target ? e.target.value : e)} />
                <Radio name="jenisStok" label="Stok Baru" value="stok baru" onChange={(e) => setJenisStok(e.target ? e.target.value : e)} />
              </div>
            )}
            {jenisProduk === "produk titipan" && (
              <div className="mt-8 flex gap-10">
                <Radio name="jenisProdukTitipan" label="Produk Lama" value="produk lama" onChange={(e) => setJenisProdukTitipan(e.target ? e.target.value : e)} />
                <Radio name="jenisProdukTitipan" label="Produk Baru" value="produk baru" onChange={(e) => setJenisProdukTitipan(e.target ? e.target.value : e)} />
              </div>
            )}
          </div>

          {jenisStok === "stok baru" && jenisProduk === "produk utama" && (
            <FormAddUtamaBaru />
          )}
          {jenisStok === "stok lama" && jenisProduk === "produk utama" && (
            <FormAddUtamaLama />
          )}

          {jenisProdukTitipan === "produk lama" && jenisProduk === "produk titipan" && (
            <FormAddTitipanLama />
          )}
          {jenisProdukTitipan === "produk baru" && jenisProduk === "produk titipan" && (
            <FormAddTitipanBaru />
          )}

          {jenisProduk === "produk hampers" && (
            <FormAddHampers />
          )}
        </div>
      </div>
    </Card>
  );
}

export default AddProduk;
