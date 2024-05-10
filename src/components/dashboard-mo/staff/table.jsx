import { Typography } from "@material-tailwind/react";
import { staffTableData } from "@/data";
import { UpdateStaff, DeleteStaff } from "../button";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context/context";
import  {GetAllStaff} from "@/api/staffApi";
import {getImage} from "@/api/index";
import {Avatar } from "@material-tailwind/react";

export default function StaffTable() {
    const [data, setData] = useState([]);
    const { search } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        GetAllStaff()
            .then((response) => {
                console.log(response)
                setData(response);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    console.log(search);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Get current page data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["No","Foto", "Username", "Nama Lengkap", "Nomor Telepon", "Email", "Gender", "Tanggal Lahir", "Jabatan", "Aksi"].map(
                            (el) => (
                                <th
                                    key={el}
                                    className="border-b border-r border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentRows
                        .filter((item) => {
                            const lowerCaseSearch = search.toLowerCase();
                            return (
                                lowerCaseSearch === "" ||
                                item.username.toLowerCase().includes(lowerCaseSearch) ||
                                item.nama_lengkap.toLowerCase().includes(lowerCaseSearch) ||
                                item.no_telp.toLowerCase().includes(lowerCaseSearch) ||
                                item.email.toLowerCase().includes(lowerCaseSearch) ||
                                item.gender.toLowerCase().includes(lowerCaseSearch) ||
                                item.tanggal_lahir.toLowerCase().includes(lowerCaseSearch) ||
                                item.tanggal_lahir.toLowerCase().includes(lowerCaseSearch)
                            );
                        })
                        .map(({ id, username,foto_profile, nama_lengkap, no_telp, email, gender, tanggal_lahir, jabatan }, index) => {
                            const className = `py-1 px-2 border-r  ${index === currentRows.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;
                            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
                            return (
                                <tr key={index}>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {rowNumber}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <div className="flex items-center gap-4 rounded-full">
                                            <Avatar src={getImage(foto_profile)} alt={foto_profile} size="sm" variant="rounded-[50px]" />
                                        </div>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {username}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {nama_lengkap}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {no_telp}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {gender}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {tanggal_lahir}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-[14px] font-[400] text-blue-gray-600">
                                            {jabatan}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <div className="flex gap-2">
                                            <UpdateStaff id={id} />
                                            <DeleteStaff id={id} />

                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
