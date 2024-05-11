import   { useState, useReducer, useContext } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { userLogin } from "../../validations/validation";
import { Button } from "@material-tailwind/react";
import { LoginApi } from "../../api/authApi";
import {  useNavigate } from "react-router-dom"; //Link,
import { GlobalContext } from "../../context/context";
import { Toast } from "react-toastify";
import { set } from "zod";
//import { Navigate } from "react-router-dom";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const Login = () => {
    const {setIsLogin, success, setSuccess} = useContext(GlobalContext);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedUser = userLogin.safeParse(formData);
        if (!parsedUser.success) {
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        }

        setFormErrors({});
        setLoading(true);
        setData(formData);
        console.log( data);
        console.log("formData", formData);
        LoginApi(formData)
            .then((res) => {
                console.log("Masuk");
                sessionStorage.setItem("token", res.access_token);
                sessionStorage.setItem("user", JSON.stringify(res.data));

                if (res.data.id_role == "1") {
                    console.log("Masuuk Sebagai Owner");

                    navigate("/owner");
                } else if (res.data.id_role == "2") {
                    console.log("Masuk Sebagai MO");
                    navigate("/mo");
                } else if (res.data.id_role == "3") {
                    console.log("Masuk Sebagai Admin");
                    navigate("/admin");
                } else {
                    console.log("Masuk Sebagai Customer");
                    navigate("/user");
                }
                setIsLogin(true);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error", err);
                
                setLoading(false);
            });
    };

    return (
        <>
            <div className="bg-authPage min-h-screen flex items-center justify-center w-full">
                <div className="bg-white bg-opacity-[38%]  shadow-md rounded-lg px-8 py-6 w-[300px] md:w-[400px] backdrop-blur-md">
                    <h1 className="text-[45px] font-bold text-center mb-6">Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaEnvelope className="mr-2 text-gray-800" />
                                <input
                                    name="email"
                                    onChange={setFormData}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    type="email"
                                    placeholder="Masukkan alamat email"
                                />
                            </div>
                            {formErrors.email && (
                                <p className="text-sm text-red-500 font-titleFont px-4 max-w-screen-md mb-[-10px]">
                                    <span className="font-bold italic mr-1">!</span>
                                    {formErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaLock className="mr-2 text-gray-800" />
                                <input
                                    name="password"
                                    onChange={setFormData}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password Anda"
                                />
                            </div>

                            <a
                                href="#"
                                onClick={toggleShowPassword}
                                className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${formErrors.password ? "mb-[-10px]" : "mb-[-35px]"
                                    }`}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </a>

                            {formErrors.password && (
                                <p className="text-sm text-red-500 font-titleFont  px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {formErrors.password}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 rounded border-gray-300 text-neutral-950 focus:text-white focus:outline-none"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm">
                                    Ingat saya
                                </label>
                            </div>
                            <a
                                href="/forgot-password"
                                className="text-xs hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950 text-neutral-700"
                            >
                                Lupa Password?
                            </a>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                Belum memiliki akun?
                                <a
                                    href="/register"
                                    className="text-xs ml-2 text-neutral-700 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                                >
                                    Daftar
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <Button className="w-full mt-3" type="submit" loading={loading}>
                                Masuk
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
