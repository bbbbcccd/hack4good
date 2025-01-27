// Attach interceptors to axiosPrivate
import { useEffect } from "react";
import { axiosPrivate } from "../../util/api/axios.js";
import { useAuthContext } from "./useAuthContext.jsx";

const useAxiosPrivate = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosPrivate;
};

export { useAxiosPrivate };
