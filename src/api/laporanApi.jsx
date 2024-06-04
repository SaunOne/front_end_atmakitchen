// apiController.js

import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetLaporanPenjualanBulanan = async (tahun) => {
    try {
        const response = await useAxios.get(`/laporan-bulanan-keseluruhan/${tahun}`, {
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

export const GetLaporanBulananProduk = async (date) => {
    try {
        const response = await useAxios.get(`/laporan-bulanan-produk/${date}`, {
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
}


export const GetLaporanPemakaianBahan = async (data) => {
    try {
        const response = await useAxios.post("/laporan-pemakaian-bahan", data, {
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

export const GetLaporanStokBahan = async () => {
    try {
        const response = await useAxios.get(`/laporan-stok-bahan`, {
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
}


export const GetLaporanPengeluaranPemasukan = async (date) => {
    try {
        const response = await useAxios.get(`/laporan-pengeluaran-pemasukkan/${date}`, {
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
}


export const GetLaporanPresensiKaryawan = async (date) => {
    try {
        const response = await useAxios.get(`/laporan-karyawan/${date}`, {
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
}


export const GetLaporanRekapTransaksi = async (date) => {
    try {
        const response = await useAxios.get(`/laporan-penitip/${date}`, {
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
}






