import useAxios from "."; 

export const GetAllKaryawan = async () => {
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

export const GetKaryawanById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/karyawan/${id}`, {
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

export const UpdateGajiKaryawan = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.post(`/karyawan/update_gaji_bonus/${data.id_user}`, data, {
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

export const DeleteKaryawanById = async (id) => {
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