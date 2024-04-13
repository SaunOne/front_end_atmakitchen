import { useState } from "react";
import bgAuth from "../../assets/img/bg-authentication.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon untuk eye toggle

import { FaEnvelope } from "react-icons/fa"; // Import ikon email
import { FaLock } from "react-icons/fa"; // Import ikon password


const Login = () => {

    // ============= Initial State Start here =============
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // ============= Initial State End here ===============
    // ============= Error Msg Start here =================
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

    const loginStyle = {
        backgroundImage: `url(${bgAuth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Mengubah latar belakang menjadi putih transparan
        color: '#000000', // Mengubah warna teks menjadi hitam abu-abu

    };

    // ============= Event Handler Start here =============
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // ============= Event Handler End here ===============
    const handleLogin = (e) => {
        e.preventDefault();

        if (!email) {
            setErrEmail("Masukkan email Anda");
        }

        if (!password) {
            setErrPassword("Masukkan password Anda");
        }
        
        // ============== Getting the value ==============
        if (email && password) {
            
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>

            <div style={loginStyle} className=" min-h-screen flex items-center justify-center w-full">
                <div className="bg-white bg-opacity-[38%]  shadow-md rounded-lg px-8 py-6 w-[300px] md:w-[400px] backdrop-blur-md">
                    <h1 className="text-[45px] font-bold text-center mb-6" >
                        Login
                    </h1>

                    <form  action="#">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaEnvelope className="mr-2 text-gray-800" />
                                <input
                                    onChange={handleEmail}
                                    value={email}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    type="email"
                                    placeholder="Masukkan alamat email"
                                />
                            </div>
                            {errEmail && (
                                <p className="text-sm text-red-500 font-titleFont px-4 max-w-screen-md mb-[-10px]">
                                    <span className="font-bold italic mr-1">!</span>
                                    {errEmail}
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
                                    onChange={handlePassword}
                                    value={password}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password Anda"
                                />
                            </div>

                            <a href="#" onClick={toggleShowPassword} className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${errPassword ? "mb-[-10px]" : "mb-[-35px]"}`}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </a>

                            {errPassword && (
                                <p className="text-sm text-red-500 font-titleFont  px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {errPassword}
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
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm"
                                >
                                    Ingat saya
                                </label>
                            </div>
                            <a
                                href="#"
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

                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
