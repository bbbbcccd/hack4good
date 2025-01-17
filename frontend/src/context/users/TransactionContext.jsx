import { useReducer } from "react";
import PropTypes from "prop-types";
import { TransactionContext } from "./TransactionContext.js";

const transactionReducer = (transactionState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return { transactions: action.payload };
    case "PURCHASE_ITEM":
      return {
        transactions: [action.payload, ...transactionState.transactions],
      };
    default:
      return transactionState;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [transactionState, transactionDispatch] = useReducer(
    transactionReducer,
    {
      transactions: [],
    }
  );

  return (
    <TransactionContext.Provider
      value={{ transactionState, transactionDispatch }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
TransactionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
