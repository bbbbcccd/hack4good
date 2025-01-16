import { useReducer } from "react";
import PropTypes from "prop-types";
import { MinimartContext } from "./MinimartContext.js";

const minimartReducer = (minimartState, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return { items: action.payload };
    case "ADD_ITEM":
      return { items: [action.payload, ...minimartState.items] };
    case "DELETE_ITEM":
      return {
        items: minimartState.items.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    case "UPDATE_ITEM":
      return {
        items: minimartState.items.map((item) => {
          if (item.name === action.payload.currentName) {
            return {
              name: action.payload.name,
              cost: action.payload.cost,
              quantity: action.payload.quantity,
            };
          } else {
            return item;
          }
        }),
      };
    default:
      return minimartState;
  }
};

export const MinimartContextProvider = ({ children }) => {
  const [minimartState, minimartDispatch] = useReducer(minimartReducer, {
    items: [],
  });

  return (
    <MinimartContext.Provider value={{ minimartState, minimartDispatch }}>
      {children}
    </MinimartContext.Provider>
  );
};
MinimartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
