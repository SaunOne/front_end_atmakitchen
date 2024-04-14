import { useReducer, useState } from "react"; 
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaUserAlt, FaPhone, FaLock, FaTransgender, FaCalendarAlt } from "react-icons/fa"; 
import { userRegistration } from "../../validations/validation"
import "./style.css";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const Register = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState({});
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData", formData);
        const parsedUser = userRegistration.safeParse(formData);
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
        // TODO: Kirim data ke server
    };

    return (
        <>
            <div className=" bg-authPage min-h-screen flex items-center justify-center w-full">
                <div className="bg-white bg-opacity-[38%] shadow-md rounded-lg px-6 md:px-[56px] py-6 w-[400px] md:w-[600px] backdrop-blur-md m-7">
                    <h1 className="text-[35px] font-bold text-center mb-6">
                        Registrasi
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                                Nama Lengkap
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaUser className="mr-2 text-gray-800" />
                                <input
                                    type="text"
                                    name="fullName"
                                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan nama lengkap"
                                    onChange={setFormData}
                                    required
                                />
                            </div>

                            {formErrors.fullName && <p className="text-red-600 font-medium">{formErrors.fullName}</p>}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <div className="flex items-center border-b-[1px] border-black">
                                <FaEnvelope className="mr-2 text-gray-800" />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                    placeholder="Masukkan alamat email"
                                    onChange={setFormData}
                                    required
                                />
                            </div>
                            {formErrors.email && <p className="text-red-600 font-medium">{formErrors.email}</p>}

                        </div>
                        <div className='md:flex w-full'>
                            <div className="mb-4 w-full pr-7">
                                <label htmlFor="username" className="block text-sm font-medium mb-2">
                                    Nama Pengguna
                                </label>
                                <div className="flex items-center border-b-[1px] border-black">
                                    <FaUserAlt className="mr-2 text-gray-800" />
                                    <input
                                        type="text"
                                        name="username"
                                        className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                        placeholder="Masukkan nama pengguna"
                                        onChange={setFormData}
                                        required
                                    />
                                </div>
                                {formErrors.username && <p className="text-red-600 font-medium">{formErrors.username}</p>}

                            </div>
                            <div className="mb-4 w-full ml-[-10px]">
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    No Telepon
                                </label>
                                <div className="flex items-center border-b-[1px] border-black">
                                    <FaPhone className="mr-2 text-gray-800" />
                                    <input
                                        type="number"
                                        name="phone"
                                        className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                                        placeholder="Masukkan no telepon"
                                        onChange={setFormData}
                                        required
                                    />
                                </div>
                                {formErrors.phone && <p className="text-red-600 font-medium">{formErrors.phone}</p>}

                            </div>
                        </div>

                        <div className="mb-4 relative ">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Kata Sandi
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaLock className="mr-2 text-gray-800" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
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
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaLock className="mr-2 text-gray-800" />
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    name="confirmPassword"
                                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
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
                                <div className="flex items-center border-b-[1px] border-black">
                                    <FaTransgender className="mr-2 text-gray-800" />
                                    <select
                                        name="gender"
                                        className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                        onChange={setFormData}
                                        required
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>

                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 w-full">
                                <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
                                    Tanggal Lahir
                                </label>
                                <div className="flex items-center border-b-[1px] border-black">
                                    <FaCalendarAlt className="mr-2 text-gray-800" />
                                    <input
                                        type="date"
                                        name="birthdate"
                                        className="w-full h-8 text-base font-medium outline-none bg-transparent appearance-none text-gray-800"
                                        onChange={setFormData}
                                        required
                                    />
                                </div>
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