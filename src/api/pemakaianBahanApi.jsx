

import useAxios from "."; 

export const GetAllPemakaianBahanBaku = async (date) => {
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
        throw error.response.data;
    }
};
