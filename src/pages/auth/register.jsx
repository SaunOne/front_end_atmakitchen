import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaUserAlt,
  FaPhone,
  FaLock,
  FaTransgender,
  FaCalendarAlt,
} from "react-icons/fa";
import { userRegistration } from "../../validations/validation";
import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom"; //Link,
//import { Navigate } from "react-router-dom";
import { RegisterApi , CekVerify} from "../../api/authApi";
import "./style.css";
import { useInterval } from "../../utility/useInterval";


const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  useInterval(() => {
    console.log("id " + id);
    if(id!==null){
        CekVerify(id).then((res) => {
            console.log("res : ",res);
            setIsActive(res);
            if(isActive === 1){
                navigate('/login');
            }
        }).catch((err)=>{
            console.log("Error", err);
        });
    } else {
        console.log("gak masuk");
    }
    
  },1000 * 3);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    const formDataObject = Object.fromEntries(formData.entries()); 
    console.log(formDataObject);
    const parsedUser = userRegistration.safeParse(formDataObject);
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

    RegisterApi(formData).then((res) => {
        console.log("Masuk");
        console.log("res : " );
        console.log(res.id_user);
        setId(res.id_user);
        setLoading(false);
      }).catch((err) => {
          console.log("Error", err);
          setLoading(false);
      });

  };

  return (
    <>
      <div className=" bg-authPage min-h-screen flex items-center justify-center w-full">
        <div className="bg-white bg-opacity-[38%] shadow-md rounded-lg px-6 md:px-[56px] py-6 w-[400px] md:w-[600px] backdrop-blur-md m-7">
          <h1 className="text-[35px] font-bold text-center mb-6">Registrasi</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium mb-2"
              >
                Nama Lengkap
              </label>
              <div className="flex items-center border-b-[1px] border-black">
                <FaUser className="mr-2 text-gray-800" />
                <input
                  type="text"
                  name="nama_lengkap"
                  className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              {formErrors.nama_lengkap && (
                <p className="text-red-600 font-medium">
                  {formErrors.nama_lengkap}
                </p>
              )}
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
                  required
                />
              </div>
              {formErrors.email && (
                <p className="text-red-600 font-medium">{formErrors.email}</p>
              )}
            </div>
            <div className="md:flex w-full">
              <div className="mb-4 w-full pr-7">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Nama Pengguna
                </label>
                <div className="flex items-center border-b-[1px] border-black">
                  <FaUserAlt className="mr-2 text-gray-800" />
                  <input
                    type="text"
                    name="username"
                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                    placeholder="Masukkan nama pengguna"
                    required
                  />
                </div>
                {formErrors.username && (
                  <p className="text-red-600 font-medium">
                    {formErrors.username}
                  </p>
                )}
              </div>
              <div className="mb-4 w-full ml-[-10px]">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  No Telepon
                </label>
                <div className="flex items-center border-b-[1px] border-black">
                  <FaPhone className="mr-2 text-gray-800" />
                  <input
                    type="number"
                    name="no_telp"
                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                    placeholder="Masukkan no telepon"
                    required
                  />
                </div>
                {formErrors.no_telp && (
                  <p className="text-red-600 font-medium">{formErrors.no_telp}</p>
                )}
              </div>
            </div>

            <div className="mb-4 relative ">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Kata Sandi
              </label>
              <div className="flex items-center border-b-[1px] border-black">
                <FaLock className="mr-2 text-gray-800" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                  placeholder="Masukkan kata sandi"
                  required
                />

                <a
                  href="#"
                  onClick={toggleShowPassword}
                  className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${
                    formErrors.password ? "mb-[-5px]" : "mb-[-30px]"
                  }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </a>
              </div>
              {formErrors.password && (
                <p className="text-red-600 font-medium">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="mb-4 relative ">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="flex items-center border-b-[1px] border-black">
                <FaLock className="mr-2 text-gray-800" />
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="confirmPassword"
                  className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800 "
                  placeholder="Masukkan Konfirmasi kata sandi"
                  required
                />
                <a
                  href="#"
                  onClick={toggleShowPassword2}
                  className={`absolute inset-y-0 right-0 flex items-center text-sm leading-5 bg-transparent text-black no-underline hover:text-neutral-950 ${
                    formErrors.confirmPassword ? "mb-[-5px]" : "mb-[-30px]"
                  }`}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </a>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-600 font-medium">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            <div className="md:flex">
              <div className="mb-4 w-full pr-5">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium mb-2"
                >
                  Jenis Kelamin
                </label>
                <div className="flex items-center border-b-[1px] border-black">
                  <FaTransgender className="mr-2 text-gray-800" />
                  <select
                    name="gender"
                    className=" w-full h-8 placeholder:text-sm placeholder:tracking-wide text-base font-medium placeholder:font-normal outline-none bg-transparent placeholder:text-gray-800"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium mb-2"
                >
                  Tanggal Lahir
                </label>
                <div className="flex items-center border-b-[1px] border-black">
                  <FaCalendarAlt className="mr-2 text-gray-800" />
                  <input
                    type="date"
                    name="tanggal_lahir"
                    className="w-full h-8 text-base font-medium outline-none bg-transparent appearance-none text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-2">
                            <div>
                                Sudah memiliki akun?
                                <a
                                    href="/login"
                                    className="text-xs ml-2 text-neutral-700 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-neutral-950"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
            <div className="flex items-center justify-center gap-4">
              <Button className="w-full mt-5"type="submit" loading={loading}>
                {loading ? "Loading" : "Daftar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
