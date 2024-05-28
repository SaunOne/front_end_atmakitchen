import useAxios from ".";

export const GetUserAlamat = async () => {
    try {
        const response = await useAxios.get("/alamat-user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetAlamatById = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/alamat/${id}`, {
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

export const CreateAlamat = async (data) => {
    try {
        const response = await useAxios.post("/alamat", data, {
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

export const UpdateAlamat = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/alamat/${data.id_alamat}`, data, {
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

export const DeleteAlamatById = async (id) => {
    console.log(id);
    try {
        
        const response = await useAxios.delete(`/alamat/${id}`, {
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