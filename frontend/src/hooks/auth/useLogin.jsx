import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext.jsx";
import { axiosPrivate } from "../../util/api.js";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password, user) => {
    setLoading(true);
    setError(null);

    const data = {
      username: username,
      password: password,
    };

    await axiosPrivate
      // conditional selection of the backend endpoint based on user/admin
      .post(`/auth/${user}`, data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        const message = error.response?.data
          ? `, ${error.response.data.msg}`
          : "";
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { login, loading, error };
};
