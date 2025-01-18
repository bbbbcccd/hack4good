import { useState } from "react";

import { useAxiosPrivate } from "../auth/useAxiosPrivate.jsx";
import { useVoucherTaskContext } from "../commons/useVoucherTaskContext.js";

const useDeleteTask = () => {
  const axiosPrivate = useAxiosPrivate();
  const { voucherTaskDispatch } = useVoucherTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTask = async (name) => {
    setError(null);
    setLoading(true);

    const data = { name };

    await axiosPrivate
      .delete("/admin/tasks", { data })
      .then(() => voucherTaskDispatch({ type: "DELETE_TASK", payload: { name } }))
      .catch((error) => {
        console.log(error.response);
        const message = error.response?.data ? `, ${error.response.data.msg}` : "";
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { error, loading, deleteTask };
};

export default useDeleteTask;
