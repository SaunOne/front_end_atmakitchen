// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllProdukUtama = async () => {
    try {
        const response = await useAxios.get("/produk-utama", {
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
export const GetProdukUtamaById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/produk-utama,/${id.id}`, {
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


export const CreateProdukUtama = async (data) => {
    try {
        const response = await useAxios.post("/produk-utama", data, {
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

export const UpdateProdukUtama = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/produk-utama/${data.id_ProdukUtama}`, data, {
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


export const DeleteProdukUtamaById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/produk-utama/${id}`, {
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