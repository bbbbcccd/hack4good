import { useState } from "react";

import { useAxiosPrivate } from "../auth/useAxiosPrivate.jsx";
import { useVoucherTaskContext } from "../commons/useVoucherTaskContext.js";

const useUpdateTask = () => {
  const axiosPrivate = useAxiosPrivate();
  const { voucherTaskDispatch } = useVoucherTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTask = async (currentName, name, reward) => {
    setError(null);
    setLoading(true);

    const data = {
      currentName,
      newName: name,
      newReward: reward,
    };

    await axiosPrivate
      .patch("/admin/tasks", data)
      .then((res) =>
        voucherTaskDispatch({ type: "UPDATE_TASK", payload: { currentName, ...res.data } }),
      )
      .catch((error) => {
        console.log(error.response);
        const message = error.response?.data ? `, ${error.response.data.msg}` : "";
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { error, loading, updateTask };
};

export default useUpdateTask;
