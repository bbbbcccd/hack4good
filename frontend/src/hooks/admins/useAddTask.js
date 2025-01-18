import { useState } from "react";

import { useAxiosPrivate } from "../auth/useAxiosPrivate.jsx";
import { useVoucherTaskContext } from "../commons/useVoucherTaskContext.js";

const useAddTask = () => {
  const axiosPrivate = useAxiosPrivate();
  const { voucherTaskDispatch } = useVoucherTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async (name, reward) => {
    setError(null);
    setLoading(true);

    const data = {
      name,
      reward,
    };

    await axiosPrivate
      .post("/admin/tasks", data)
      .then((res) => voucherTaskDispatch({ type: "ADD_TASK", payload: res.data }))
      .catch((error) => {
        console.log(error.response);
        const message = error.response?.data ? `, ${error.response.data.msg}` : "";
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { error, loading, addTask };
};

export default useAddTask;
