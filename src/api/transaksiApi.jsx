
import useAxios from ".";

export const GetAllTransaction = async () => {
    try {
        const response = await useAxios.get("/transaksi/all", {
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

export const GetAllUserTransaction = async () => {
    try {
        const response = await useAxios.get("/transaksi", {
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

export const GetAllTransaction = async () => {
    try {
        const response = await useAxios.get("/transaksi/all", {
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


export const CheckStock = async (data) => {
    try {
        console.log("masuk sini");
        const response = await useAxios.post("/cek-stok", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const Checkout= async (data) => {
    try {
        console.log("masuk sini");
        const response = await useAxios.post("/check-out", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const KonfirmasiAdmin = async (data) => {
    try {
        const response = await useAxios.post(`/konfirmasi-admin/${data.id_transaksi}`, data, {
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

export const BayarPesanan = async (data) => {
    try {
        const response = await useAxios.post(`/bayar/${data.id_transaksi}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetPembelianBahan = async () => {
    try {
        const response = await useAxios.get("/tampil-belanja-bahan", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.bahan);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};





export const KonfirmasiMO = async (data) => {
    try {
        const response = await useAxios.post(`/konfirmasi-mo/${data.id_transaksi}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const GetKebutuhanBahanBakuByID = async (id) => {
    try {
        const response = await useAxios.get(`/cek-bahan/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.kekurangan_bahan);    
        return response.data.kekurangan_bahan;
    } catch (error) {
        throw error.response.data;
    }
};
