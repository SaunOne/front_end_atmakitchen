import useAxios from ".";

export const GetAllCustomers = async () => {
    try {
        const response = await useAxios.get("/customers", {
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

export const GetUserProfile = async () => {
    try {
        const response = await useAxios.get("/user-profile", {
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

export const UpdateProfile = async (data) => {
    try {
        const response = await useAxios.post("/user/update-profile", data, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error.response.data);
        throw error.response.data;
    }
};

export const GetAllTransaksi = async () => {
    try {
        const response = await useAxios.get("/transaksi", {
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

export const GetAllTransaksiAdmin = async () => {
    try {
        const response = await useAxios.get("/transaksi/all", {
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

export const CetakNota = async (id) => {
    try {
        console.log(id);
        const response = await useAxios.get(`/cetak-nota/${id}`, {
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

export const GetAllWithdrawUser = async () => {
    try {
        const response = await useAxios.get("/withdraw", {
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

export const GetWithdrawUserById = async (id) => {
    try {
        const response = await useAxios.get(`/withdraw/${id}`, {
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

export const KonfirmasiWithdraw = async (data) => {
    try {
        const response = await useAxios.post(`/konfirmasi-withdraw/${data.id}`, data, {
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

