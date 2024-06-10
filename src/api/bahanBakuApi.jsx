// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllBahanBaku = async () => {
    try {
        const response = await useAxios.get("/bahan", {
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
export const GetAllPemakaianBahan= async (date) => {
    try {
        const response = await useAxios.get(`/pemakaian-bahan/${date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data.data;
    }
};

export const GetAllPemakaianBahanMerge = async (date) => {
    try {
        const response = await useAxios.get(`/pemakaian-bahan/${date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.merge_produk);
        return response.data.merge_produk;
    } catch (error) {
        throw error.response.data.merge_produk;
    }
};

export const GetAllPemakaianBahanRekap = async (date) => {
    try {
        const response = await useAxios.get(`/pemakaian-bahan/${date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.rekap_bahan);
        return response.data.rekap_bahan;
    } catch (error) {
        throw error.response.data.rekap_bahan;
    }
};


// Menampilkan deposit berdasarkan ID
export const GetBahanBakuById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/bahan/${id}`, {
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


export const CreateBahanBaku = async (data) => {
    try {
        const response = await useAxios.post("/bahan", data, {
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

export const UpdateBahanBaku = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/bahan/${data.id_penitip}`, data, {
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

export const UpdateBahanBakuAdmin = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/bahan/${data.id_bahan}`, data, {
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

export const DeletePenitipById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/bahan/${id}`, {
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

export const DeleteBahanBakuById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/bahan/${id}`, {
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

export const SendNotifProcess = async (id_user, id_transaksi) => {
    try {
        console.log(id_user);
        console.log(id_transaksi);  
        const response = await useAxios.get(`/sendNotification/${id_user}/${id_transaksi}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`, // Perbaiki tanda kutip
            },
        });
        console.log(response);
        return response.data; // Mengembalikan hanya data dari respons
    } catch (error) {
        console.error(error);
        throw error.response.data; // Mengembalikan hanya data dari respons error
    }
};


