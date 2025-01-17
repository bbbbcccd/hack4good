import { useReducer } from "react";
import PropTypes from "prop-types";
import { VoucherTaskContext } from "./VoucherTaskContext.js";

const voucherTaskReducer = (voucherTaskState, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return { tasks: action.payload };
    case "ADD_TASK":
      return { tasks: [action.payload, ...voucherTaskState.tasks] };
    case "DELETE_TASK":
      return {
        tasks: voucherTaskState.tasks.filter(
          (task) => task.name !== action.payload.name
        ),
      };
    case "UPDATE_TASK":
      return {
        tasks: voucherTaskState.tasks.map((task) => {
          if (task.name === action.payload.currentName) {
            return {
              name: action.payload.name,
              reward: action.payload.reward,
            };
          } else {
            return task;
          }
        }),
      };
    default:
      return voucherTaskState;
  }
};

export const VoucherTaskContextProvider = ({ children }) => {
  const [voucherTaskState, voucherTaskDispatch] = useReducer(
    voucherTaskReducer,
    {
      tasks: [],
    }
  );

  return (
    <VoucherTaskContext.Provider
      value={{ voucherTaskState, voucherTaskDispatch }}
    >
      {children}
    </VoucherTaskContext.Provider>
  );
};
VoucherTaskContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
