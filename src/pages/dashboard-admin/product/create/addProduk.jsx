import React, { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export function AddProduk() {
  const [jenisProduk, setJenisProduk] = useState("");
  const [jenisStok, setJenisStok] = useState("");
  const [jenisProdukTitipan, setJenisProdukTitipan] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/admin/product";
  };

  useEffect(() => {
    setJenisStok("");
  }, [jenisProduk]);

  useEffect(() => {
    setJenisProdukTitipan("");
  }, [jenisProduk]);

  const [inputs, setInputs] = useState([{ isi_produk: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { isi_produk: "" }]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  return (
    <Card color="white" shadow={false}>
      <div className="border rounded-xl border-gray-400 p-4 shadow-md">
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
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




            {jenisStok === "stok baru" && jenisProduk === "produk utama" && (
              <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                <form action="">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Nama Produk
                    </Typography>
                    <Input
                      size="lg"
                      placeholder=""
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Gambar Produk
                    </Typography>
                    <Input
                      size="lg"
                      type="file"
                      placeholder=""
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </form>
              </div>
            )}
            {jenisStok === "stok lama" && jenisProduk === "produk utama" && (
              <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Nama Produk
                  </Typography>
                  <Input
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
            )}
            {jenisProdukTitipan === "produk lama" && jenisProduk === "produk titipan" && (
              <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Nama Produk
                  </Typography>
                  <Select
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  >
                    <Option value="keripik pisang"> Keripik Pisang</Option>
                  </Select>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Jumlah
                  </Typography>
                  <Input
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
            )}
            {jenisProdukTitipan === "produk baru" && jenisProduk === "produk titipan" && (
              <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Nama Penitip
                  </Typography>
                  <Select
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}>
                    <Option value="Exel">Exel</Option>
                    <Option value="Tinar">Tinar</Option>
                    <Option value="Keju">Keju</Option>
                  </Select>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Nama Produk
                  </Typography>
                  <Input
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Jumlah
                  </Typography>
                  <Input
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
            )}
            {jenisProduk === "produk hampers" && (
              <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-1">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Nama Produk
                  </Typography>
                  <Input
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Deskripsi Hampers
                  </Typography>
                  <Textarea
                    size="lg"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Gambar Produk
                  </Typography>
                  <Input
                    size="lg"
                    type="file"
                    placeholder=""
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                {inputs.map((input, index) => (
                  <div key={index} className="mb-1 gap-2 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                        Isi Produk
                      </Typography>
                      <Select
                        size="lg"
                        placeholder=""
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        value={input.isi_produk}
                      >
                        <Option value="Lapis Legit">Lapis Legit</Option>
                      </Select>
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                        Jumlah
                      </Typography>
                      <Input
                        size="lg"
                        placeholder=""
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      {inputs.length > 1 && (
                        <button onClick={() => handleRemoveInput(index)} className="mr-2 border-none">
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      )}
                      {index === inputs.length - 1 && (
                        <button onClick={handleAddInput} className=" border-none">
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="mt-6">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddProduk;
