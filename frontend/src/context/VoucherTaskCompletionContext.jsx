import { useReducer } from "react";
import PropTypes from "prop-types";
import { VoucherTaskCompletionContext } from "./VoucherTaskCompletionContext.js";

const voucherTaskCompletionReducer = (voucherTaskCompletionState, action) => {
  switch (action.type) {
    case "GET_TASK_COMPLETIONS":
      return { tasks: action.payload };
    case "ADD_TASK_COMPLETION":
      return { tasks: [action.payload, ...voucherTaskCompletionState.tasks] };
    case "UPDATE_TASK_COMPLETION":
      return {
        tasks: voucherTaskCompletionState.tasks.map((taskCompletion) => {
          if (
            taskCompletion.name === action.payload.name &&
            taskCompletion.username === action.payload.username
          ) {
            return action.payload;
          } else {
            return taskCompletion;
          }
        }),
      };
    default:
      return voucherTaskCompletionState;
  }
};

export const VoucherTaskCompletionContextProvider = ({ children }) => {
  const [voucherTaskCompletionState, voucherTaskCompletionDispatch] =
    useReducer(voucherTaskCompletionReducer, {
      taskCompletions: [],
    });

  return (
    <VoucherTaskCompletionContext.Provider
      value={{ voucherTaskCompletionState, voucherTaskCompletionDispatch }}
    >
      {children}
    </VoucherTaskCompletionContext.Provider>
  );
};
VoucherTaskCompletionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
