// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllPengeluaranBahanBaku = async () => {
    try {
        const response = await useAxios.get("/pembelian-bahan", {
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
export const GetPengeluaranBahanBakuById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/pembelian-bahan/${id.id}`, {
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


export const CreatePengeluaranBahanBaku = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.post("/pembelian-bahan", data, {
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

export const UpdatePengeluaranBahanBaku = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/pembelian-bahan/${data.id_pengeluaran_bahan_baku}`, data, {
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


export const DeletePengeluaranBahanBakuById = async (id) => {
    console.log(id);
    try {
        const response = await useAxios.delete(`/pembelian-bahan/${id}`, {
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