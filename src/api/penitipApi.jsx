// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllPenitip = async () => {
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
        console.log(id);
        const response = await useAxios.get(`/penitip/${id.id}`, {
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


export const CreatePenitip = async (data) => {
    try {
        const response = await useAxios.post("/penitip", data, {
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

export const UpdatePenitip = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/penitip/${data.id_penitip}`, data, {
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
        
        const response = await useAxios.delete(`/penitip/${id}`, {
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