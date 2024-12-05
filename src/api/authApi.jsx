import useAxios from ".";

// Assuming you're using Axios, make sure to import it at the beginning of your file
// import useAxios from 'axios';

export const LoginApi = async (data) => {
  try {
    const response = await useAxios.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // biar tau data masuk apa engga
    console.log("Response:", response.data.data);

    console.log("Token:", response.data.access_token);
    //menaruk token di stronge agar bisa digunakan di query lain yang butuh auth
    
    
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error:", error);
    // Throw the error response data if needed
    throw error.response.data;
  }
};

//register
export const RegisterApi = async (data) => { //data diisi dengan maping atau object dasar
  try {
    console.log(data);  
    const response = await useAxios.post("/register", data);

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const CekVerify = async (id) => { //data diisi dengan maping atau object dasar
    try {
      
      const response = await useAxios.get("/cek-active/" + id);
  
      console.log("Response:", response.data.Status);
  
      return response.data.Status;
    } catch (error) {
      throw error.response;
    }
};

export const ForgotPasswordUser = async (data) => { //data diisi dengan maping atau object dasar
  try {
    
    const response = await useAxios.post("/forgot-password",data);

    console.log("Response:", response.data);

    return response.data.status;
  } catch (error) {
    throw error.response;
  }
};

export const ResetPassword = async (data) => { //data diisi dengan maping atau object dasar
  try {
    
    const response = await useAxios.post("/reset-password",data);

    console.log("Response: ", response.data);

    return response.data;
  } catch (error) {
    console.log("Error: ", error.status);
    throw error.response;
  }
};

export const UpdatePassword = async (data) => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    try {
        const response = await useAxios.post("/update-password", data, {
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error.response.data);
        throw error.response.data;
    }
};
