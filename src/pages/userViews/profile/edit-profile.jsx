import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



export default function Page() {
    // const { id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({});
    const navigateTo = useNavigate();
    const id = 1;
    console.log(id); 
    

    const user = [{
        id: 1,
        img: "https://source.unsplash.com/random/200x200",
        username: "admin",
        email: "julian@gmail.com",
        nama_lengkap: "Julian",
        nama_role: "user",
        no_telp: "08123456789",
        gender: "Laki-laki",
        tanggal_lahir: "12-12-2000",
    }];
    console.log(user);

    useEffect(() => {
        const data = user.find(item => item.id === id);
        if (data) {
            setValues({
                username: data.username,
                email: data.email,
                nama_lengkap: data.nama_lengkap,
                nama_role: data.nama_role,
                no_telp: data.no_telp,
                gender: data.gender,
                tanggal_lahir: data.tanggal_lahir,
            });
        }
        console.log(values);
    }, [id]);

    return (
        <div className="w-full">


            <h1 className='text-black'>Profile</h1>


        </div>
    );
}