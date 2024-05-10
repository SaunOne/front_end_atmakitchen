// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllPengeluaranLain = async () => {
    try {
        const response = await useAxios.get("/pengeluaran-lain-lain", {
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
export const GetPengeluaranLainById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/pengeluaran-lain-lain/${id.id}`, {
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


export const CreatePengeluaranLain = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.post("/pengeluaran-lain-lain", data, {
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

export const UpdatePengeluaranLain = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/pengeluaran-lain-lain/${data.id_pengeluaran_lain_lain}`, data, {
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


export const DeletePengeluaranLainById = async (id) => {
    console.log(id);
    try {
        const response = await useAxios.delete(`/pengeluaran-lain-lain/${id}`, {
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