import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/global_context';
import { FormEditAlamat } from "@/components/userView/profile/formEditAlamat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { GetUserAlamat, DeleteAlamatById } from "@/api/alamatApi";

export default function Page() {
    const { user } = useContext(GlobalContext);
    console.log(user);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        GetUserAlamat()
          .then((response) => {
            setData(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    const { setSuccess, success } = useContext(GlobalContext);

    const handleDelete = (id) => {
        DeleteAlamatById(id)
            .then((response) => {
                console.log(response);
                setData(data.filter(item => item.id_alamat !== id));
                setSuccess({ bool: true, message: 'Alamat berhasil dihapus' });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="px-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-gray-800 font-bold text-[30px]">Alamat</h1>
                <div className="">
                    <button onClick={() => navigate("/user/profile/addAlamat")} className="text-black px-2 py-2 rounded-md bg-brown-200 hover:bg-blue-700 font-bold ">
                        Tambah
                    </button>
                </div>
            </div>
            <div className="bg-white h-[600px] rounded-[10px] p-6">
                {data.map((item) => (
                    <div key={item.id} className="mb-4 p-3 border border-gray-300 rounded shadow-md text-black">
                        <p className=" font-bold">{item.detail_alamat}, {item.kelurahan}, {item.kecamatan}, {item.kabupaten}, {item.provinsi}, {item.kode_pos}</p>
                        <div className="flex justify-end">
                            <button onClick={() => navigate(`/user/profile/editAlamat/${item.id_alamat}`)} className=" text-blue-500 font-bold py-2 px-4 rounded">
                                <FontAwesomeIcon icon={faPencil}/>
                            </button>
                            <button onClick={() => handleDelete(item.id_alamat)} className=" text-red-500 font-bold py-2 px-4 rounded">
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
