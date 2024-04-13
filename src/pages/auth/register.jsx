import { useReducer, useState } from "react"; // Mengimpor useState untuk pengelolaan state
import { z } from "zod"; // Mengimpor zod untuk validasi

import bgAuth from "../../assets/img/bg-authentication.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon untuk eye toggle

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const User = z
    .object({
        fullName: z
            .string({
                required_error: "Username is required",
                invalid_type_error:
                    "Nama Lengkap wajib terdiri dari minimal 3 karakter & maksimal 50 karakter!",
            })
            .min(3, { message: "Nama Lengkap wajib terdiri dari minimal 3 karakter" })
            .max(50, { message: "Nama Lengkap maksimal 50 karakter" }),
        username: z
            .string({
                required_error: "Username is required",
                invalid_type_error:
                    "Username wajib terdiri dari minimal 3 karakter & maksimal 15 karakter!",
            })
            .min(3, { message: "Username wajib terdiri dari minimal 3 karakter" })
            .max(15, { message: "Username maksimal 15 karakter" }),
        email: z
            .string({
                required_error: "Email is required!",
            })
            .email({ message: "Email tidak valid" }),
        phone: z
            .string({
                invalid_type_error:
                    "Nomor Telepon wajib terdiri dari minimal 10 angka & maksimal 15 angka!",
            })
            .min(10, { message: "Nomor Telepon minimal 10 angka" })
            .max(15, { message: "Nomor Telepon maksimal 15 angka" }),
        gender: z
            .string()
            .min(1, { message: "Jenis Kelamin harus dipilih" }),
        birthdate: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir tidak valid (YYYY-MM-DD)" }),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error:
                    "Password wajib terdiri dari minimal 6 karakter & maksimal 20 karakter!",
            })
            .min(6, { message: "Password minimal 6 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),

        confirmPassword: z.string()
            .min(6, { message: "Password minimal 6 karakter" })
            .max(20, { message: "Password maksimal 20 karakter" }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Tidak sesuai dengan Password yang diinputkan! ",
            });
        }
    });

const Register = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const registerStyle = {
        backgroundImage: `url(${bgAuth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Mengubah latar belakang menjadi putih transparan
        color: '#000000', // Mengubah warna teks menjadi hitam abu-abu
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData", formData);
        const parsedUser = User.safeParse(formData);
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
        // TODO: Send data to server
    };

    return (
        <>
            <div style={registerStyle} className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white bg-opacity-[38%] shadow-md rounded-lg px-6 md:px-[56px] py-6 w-[400px] md:w-[600px] backdrop-blur-md m-7">
                    <h1 className="text-[35px] font-bold text-center mb-6">
                        Registrasi
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                placeholder="Masukkan nama lengkap"
                                onChange={setFormData}
                                required
                            />
                            {formErrors.fullName && <p className="text-red-600 font-medium">{formErrors.fullName}</p>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                placeholder="Masukkan alamat email"
                                onChange={setFormData}
                                required
                            />
                            {formErrors.email && <p className="text-red-600 font-medium">{formErrors.email}</p>}

                        </div>
                        <div className='md:flex w-full'>
                            <div className="mb-4 w-full pr-7">
                                <label htmlFor="username" className="block text-sm font-medium mb-2">
                                    Nama Pengguna
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan nama pengguna"
                                    onChange={setFormData}
                                    required
                                />
                                {formErrors.username && <p className="text-red-600 font-medium">{formErrors.username}</p>}

                            </div>
                            <div className="mb-4 w-full ml-[-10px]">
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    No Telepon
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan no telepon"
                                    onChange={setFormData}
                                    required
                                />
                                {formErrors.phone && <p className="text-red-600 font-medium">{formErrors.phone}</p>}

                            </div>
                        </div>

                        <div className="mb-4 relative ">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Kata Sandi
                            </label>
                            <div className="flex items-center border-black">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan kata sandi"
                                    onChange={setFormData}
                                    required
                                />

                                <a href="#" onClick={toggleShowPassword} className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${formErrors.password ? 'mb-[-5px]' : 'mb-[-30px]'}`}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </a>

                            </div>
                            {formErrors.password && <p className="text-red-600 font-medium">{formErrors.password}</p>}


                        </div>
                        <div className="mb-4 relative ">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                Konfirmasi Kata Sandi
                            </label>
                            <div className="flex items-center border-black">
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    name="confirmPassword"
                                    className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan Konfirmasi kata sandi"
                                    onChange={setFormData}
                                    required
                                />
                                <a href="#" onClick={toggleShowPassword2} className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${formErrors.confirmPassword ? 'mb-[-5px]' : 'mb-[-30px]'}`}>
                                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                </a>

                            </div>
                            {formErrors.confirmPassword && <p className="text-red-600 font-medium">{formErrors.confirmPassword}</p>}


                        </div>
                        <div className='md:flex'>
                            <div className="mb-4 w-full pr-5">
                                <label htmlFor="gender" className="block text-sm font-medium mb-2">
                                    Jenis Kelamin
                                </label>
                                <select
                                    name="gender"
                                    className="border-b-[1px] border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    onChange={setFormData}
                                    required
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>

                                </select>
                            </div>
                            <div className="mb-4 w-full">
                                <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    style={{ color: 'black',}}
                                    className="border-b-[1px]  border-black w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    onChange={setFormData}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                        >
                            Daftar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;