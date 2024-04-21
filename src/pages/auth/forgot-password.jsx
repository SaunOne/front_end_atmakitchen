import { useState, useReducer } from "react";
import { FaEnvelope } from "react-icons/fa";
import { forgotPassword } from "../../validations/validation";
import { useInterval } from "../../utility/useInterval";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const ForgotPassword = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState({});

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const parsedUser = forgotPassword.safeParse(formData);
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
                        Lupa Sandi
                    </h1>
                    <h2 className="text-[15px] text-center align-justify mb-6">
                        Lupa kata sandi Anda? Beri tahu kami alamat email Anda
                        dan kami akan mengirimkan tautan pengaturan ulang kata sandi melalui email.
                    </h2>
                    <form onSubmit={handleSubmit}>
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

                        <button
                            type="submit"
                            className="w-full mt-12 flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
