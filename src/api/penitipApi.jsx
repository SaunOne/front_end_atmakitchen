// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllPenitip= async () => {
    try {
        const response = await useAxios.get("/penitip", {
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
export const GetPenitipById = async (id) => {
    try {
        const response = await useAxios.get(`/penitip/${id}`, {
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


