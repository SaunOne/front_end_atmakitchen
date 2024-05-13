
import useAxios from "."; // Sesuaikan dengan path sesuai struktur proyek Anda
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