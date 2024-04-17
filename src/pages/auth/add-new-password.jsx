import { useState, useReducer } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { addNewPassword } from "../../validations/validation";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const AddNewPassword = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [showPassword, setShowPassword] = useState(false);

    const [showPassword2, setShowPassword2] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedUser = addNewPassword.safeParse(formData);
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
        console.log("formData", formData);
        setFormErrors({});
        // TODO: Kirim data ke server
    };

    return (
        <>
            <div className="bg-authPage min-h-screen flex items-center justify-center w-full">
                <div className="bg-white bg-opacity-[38%]  shadow-md rounded-lg px-8 py-6 w-[300px] md:w-[400px] backdrop-blur-md">
                    <h1 className="text-[35px] font-bold text-center mb-6" >
                        Ubah Password
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                            >
                                Password Baru
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

                            <a href="#" onClick={toggleShowPassword} className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${formErrors.password ? "mb-[-10px]" : "mb-[-35px]"}`}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </a>

                            {formErrors.password && (
                                <p className="text-sm text-red-500 font-titleFont  px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {formErrors.password}
                                </p>
                            )}

                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                            >
                                Konfirmasi Password Baru
                            </label>
                            <div className="flex items-center border-b-[1px] border-black">
                                <FaLock className="mr-2 text-gray-800" />
                                <input
                                    name="confirmPassword"
                                    onChange={setFormData}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                                    type={showPassword2 ? "text" : "password"}
                                    placeholder="Masukkan password Anda"
                                />
                            </div>

                            <a href="#" onClick={toggleShowPassword2} className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${formErrors.confirmPassword ? "mb-[-10px]" : "mb-[-35px]"}`}>
                                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                            </a>

                            {formErrors.confirmPassword && (
                                <p className="text-sm text-red-500 font-titleFont  px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {formErrors.confirmPassword}
                                </p>
                            )}

                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewPassword;
