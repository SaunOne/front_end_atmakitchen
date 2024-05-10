// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllStaff = async () => {
    try {
        const response = await useAxios.get("/karyawan", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Menampilkan deposit berdasarkan ID
export const GetStaffById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/karyawan/${id.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const CreateStaff = async (data) => {
    try {
        const response = await useAxios.post("/karyawan", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const UpdateStaff = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/karyawan/${data.id_penitip}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const DeleteStaffById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/karyawan/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};