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