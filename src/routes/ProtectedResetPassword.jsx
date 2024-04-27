import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */


const ProtectedResetPassword = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token-reset-password");
    setToken(tokenDariSS);
    if (!tokenDariSS) {
      navigate("/forgot-password");
    }
  }, [navigate]);
  return token && (children ? children : <Outlet />);
};
export default ProtectedResetPassword;